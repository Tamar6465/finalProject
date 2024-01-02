const Joi = require("joi");
const { Resort } = require("../models/resort.model");
const { Types } = require("mongoose");
const { dateTokenForRent } = require("./order.controller");
const AppError = require("../utils/AppError");

const resortJoiSchema = {

    add: Joi.object().keys({
        name: Joi.string().required(),
        adress: Joi.string().required(),
        city: Joi.string().required(),
        ownerId: Joi.required(),
        accessibility: Joi.string().required(),
        price: Joi.number().required(),
        category: Joi.string().required(),
        placeId: Joi.string(),
        numBed: Joi.string().required(),
        events:Joi.array(),
        images:Joi.array(),
        description: Joi.string(),
        phone:Joi.string()

    }),
    update: Joi.object().keys({
        name: Joi.string(),
        adress: Joi.string(),
        city: Joi.string(),
        ownerId: Joi.string(),
        accessibility: Joi.string(),
        price: Joi.number(),
        category: Joi.string(),
        placeId: Joi.string(),
        numBed: Joi.string(),
        events:Joi.array()


    })
};
exports.addResort = async (req, res, next) => {

    const body = req.body;
    try {
        // if(req.type=="owner"){
            console.log(body);
            body.ownerId = new Types.ObjectId(req.user.id);
            const validate = resortJoiSchema.add.validate(body);
            if (validate.error) {
                throw Error(validate.error);
            }
            console.log(body.ownerId);
            const newResort = new Resort(body);
            await newResort.save();
            //* generate token
            return res.status(201).send(newResort);
        // }else{
        //     return next(new AppError(400, "Not authorized"));

        // }
      
    }
    catch (error) {
        console.error(error);
    }
}
exports.updateResort = async (req, res, next) => {

    const body = req.body;
    const { id } = req.params;
    console.log(id);
    try {
        if(req.type=="owner"){

        const validate = resortJoiSchema.update.validate(body);
        if (validate.error) {
            throw Error(validate.error);
        }
        const update = await Resort.updateOne({ id: id }, body);
        //* generate token
        res.status(201).json({
            status: "success",
            update
        })
    }else{
        return next(new AppError(400, "Not authorized"));

    }
    }
    catch (error) {
        console.error(error);
    }
}
exports.deleteResort = async (req, res, next) => {
    const { id } = req.params;
    try {
        if(req.type=="owner"&&req.user?.roles=="admin"){

        const deleteResort = await Resort.deleteOne({ id: id });
        //* generate token
        res.status(201).json({
            status: "success",
            deleteResort
        })}
        else{
            return next(new AppError(400, "Not authorized"));

        }
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
exports.getResort = async (req, res, next) => {
    try {
        const { id } = req.params;
        const resort = await Resort.find({ id: id }).populate("ownerId");
        if (!resort) return next(new AppError(400, "resort not exist"));
        res.status(200).json({
            status: "success",
            resort
        })
    } catch (error) {
        console.error(error);
    }
}
exports.getResortByDisabled = async (req, res, next) => {
    const { disable } = req.params;
    try {
        const resort = await Resort.find({ accessibility: disable }).populate("ownerId");
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
exports.getResortById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const resort = await Resort.find({ id: id }).populate("ownerId");
        if (!resort) return next(new AppError(400, "resort not exist"));
        res.status(200).json({
            status: "success",
            resort
        })
    } catch (error) {
        console.error(error);
    }
};
exports.getbyPrice = async (req, res, next) => {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    try {
        const resorts = await Resort.find({ price: { $gte: minPrice, $lte: maxPrice } }).populate("ownerId");
        if (!resorts) return next(new AppError(400, "resort not exist"));
        res.status(200).json({
            status: "success",
            resorts
        })
    } catch (error) {
        next(error)
    }
}