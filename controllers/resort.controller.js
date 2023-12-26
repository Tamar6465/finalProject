const Joi = require("joi");
const { Resort } = require("../models/resort.model");
const { Types } = require("mongoose");

const resortJoiSchema = {

    add: Joi.object().keys({
        name: Joi.string().required(),
        adress: Joi.string().required(),
        city: Joi.string().required(),
        ownerId:Joi.string().required(),
        accessibility: Joi.string().required(),
        price: Joi.number().required()
    }),
    update: Joi.object().keys({
        name: Joi.string(),
        adress: Joi.string(),
        city: Joi.string(),
        ownerId:Joi.string(),
        accessibility: Joi.string(),
        price: Joi.number().required()

    })
};
exports.addResort = async (req, res, next) => {
        const body = req.body;
        try {
            const validate = resortJoiSchema.add.validate(body);
            if (validate.error) {
                throw Error(validate.error);
            }
            console.log( body.ownerId);
            body.ownerId=new Types.ObjectId(body.ownerId)
            const newResort = new Resort(body);
            await newResort.save();

            //* generate token
            return res.status(201).send(newResort);
        }
        catch (error) {
            console.error(error);
        }
    }
exports.updateResort = async (req, res, next) => {
        const body = req.body;
        const {id}=req.params;
        console.log(id);
        try {
            const validate = resortJoiSchema.update.validate(body);
            if (validate.error) {
                throw Error(validate.error);
            }
            const update = await Resort.updateOne({id:id},body);
            //* generate token
            res.status(201).json({
                status: "success",
                update
            })
        }
        catch (error) {
            console.error(error);
        }
    }
    exports.deleteResort = async (req, res, next) => {
        const {id}=req.params;
        try {
            const deleteResort =await  Resort.deleteOne({id:id});
            //* generate token
            res.status(201).json({
                status: "success",
                deleteResort
            })
        }
        catch (error) {
            console.error(error);
        }
    }
exports.getAllResort = async (req, res, next) => {
        try {
            const resorts = await Resort.find({}).populate("ownerId");
            if (!resorts) return next(new AppError(400, "user not exist"));
            res.status(200).json({
                status: "success",
                resorts
            })
        } catch (error) {
            console.error(error);
        }
    }
    exports.getResortByDisabled = async (req, res, next) => {
        const { disable } = req.params;
        try {
            const resort = await Resort.find({ disable: disable }).populate("ownerId");
            if (!resort) return next(new AppError(400, "resort not exist"));
            res.status(200).json({
                status: "success",
                resort
            })
        } catch (error) {
            console.error(error);
        }
    }
    exports.getResortByCity = async (req, res, next) => {
        const { city } = req.params;
        try {
            const resort = await Resort.find({ city: city }).populate("ownerId");
            if (!resort) return next(new AppError(400, "resort not exist"));
            res.status(200).json({
                status: "success",
                resort
            })
        } catch (error) {
            console.error(error);
        }
    };