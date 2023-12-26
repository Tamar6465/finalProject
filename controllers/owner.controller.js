const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { Owner } = require("../models/owner.model");
const { generateToken } = require("../utils/jwt");

const ownerJoiSchema = {
    login: Joi.object().keys({
        password: Joi.string(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(() => Error('Email is not valid')),
    }),
    register: Joi.object().keys({
        password: Joi.string().max(20).required(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(() => Error('Email is not valid')).required(),
        name: Joi.string().required(),
        roles:Joi.string(),
    })
};
const checkIfOwnerExists = async (email) => {
    const owner = await Owner.findOne({ email });
    if (owner) return owner;
    return false;
}
exports.register = async (req, res, next) => {
    const body = req.body;
    try {
        const validate = ownerJoiSchema.register.validate(body);
        if (validate.error) {
            throw Error(validate.error);
        }
        if (await checkIfOwnerExists(body.email)) {
            throw new Error("Already in the sysytem");
        };
        const hash = await bcrypt.hash(body.password, 10);
        body.password = hash;
       
        const newOwner = new Owner(body);
        await newOwner.save();

        //* generate token
        
        return res.status(201).send(newOwner);
    } catch (error) {
        next(error);
    }
};
exports.login = async (req, res, next) => {
    const body = req.body;
    try {
        const validate = ownerJoiSchema.login.validate(body);
        if (validate.error) {
            throw Error(validate.error);
        }
        const owner = await checkIfOwnerExists(body.email);
        if (!owner || ! await bcrypt.compare(body.password, user.password)) {
            throw new Error('Password or email not valid');
        }
        const token = generateToken(owner);
        return res.send(token);       
    } catch (error) {
        next(error);
    }
};