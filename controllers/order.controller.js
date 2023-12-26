const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { Order } = require("../models/order.model");
const { Types } = require("mongoose");
const orderJoiSchema = {
    add: Joi.object().keys({
        dateOrder: Joi.date().required(),
        dateStart: Joi.date().required(),
        dateEnd: Joi.date().required(),
        sumOrder: Joi.number().required(),
        userId:Joi.string().required(),
        resortId:Joi.string().required()
    }),
    update:
        Joi.object().keys({
            dateOrder: Joi.date(),
            dateStart: Joi.date(),
            dateEnd: Joi.date(),
            sumOrder: Joi.number(),
            userId:Joi.string(),
            resortId:Joi.string()
        }),
};

exports.addOrder = async (req, res, next) => {
    const body = req.body;
    try {
        const validate = orderJoiSchema.add.validate(body);
        if (validate.error) {
            throw Error(validate.error);
        }
        body.dateOrder = new Date(body.dateOrder);
        body.dateStart = new Date(body.dateStart);
        body.dateEnd = new Date(body.dateEnd);
        if (body.dateStart.getTime()<body.dateEnd.getTime()) {
        }else{
            throw new Error("date invalid 1")
        }
        const today = new Date(); // יצירת תאריך ליום הנוכחי
        if(body.dateStart.getTime() <= today.getTime()){
            throw new Error("date invalid 2")
        }
        body.resortId = new Types.ObjectId(body.resortId)
        body.userId = new Types.ObjectId(body.userId)
        const newOrder = new Order(body);
        await newOrder.save();
        return res.status(201).send(newOrder);

    } catch (error) {
        next(error)
    }

};
exports.updateOrder=async(req,res,next)=>{
    try {
        const body = req.body;
        const {id}=req.params;
        const validate = orderJoiSchema.update.validate(body);
        if (validate.error) {
            throw Error(validate.error);
        }
        if (body.dateOrder) {
            body.dateOrder = new Date(body.dateOrder);
        }
        if (body.dateStart&&body.dateEnd) {
            body.dateStart = new Date(body.dateStart); 
            body.dateEnd = new Date(body.dateEnd);
            if (body.dateStart.getTime()<body.dateEnd.getTime()) {
            }else{
                throw new Error("date invalid 1")
            }
            const today = new Date(); // יצירת תאריך ליום הנוכחי
            if(body.dateStart.getTime() <= today.getTime()){
                throw new Error("date invalid 2")
            }
        }
    
        const updateOrder = await Order.updateOne({id:id},body);
        return res.status(201).send(updateOrder);

    } catch (error) {
        next(error)
    }
}

exports.deleteOrder=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const deleteOne = await Order.deleteOne({id:id});
        return res.status(201).send(deleteOne);

    } catch (error) {
        next(error)
    }
}

exports.getAll=async(req,res,next)=>{
    try {
        const orders=await Order.find({}).populate("resortId").populate("userId");
        return res.status(200).send({
            status:"success",
            orders
        })
    } catch (error) {
        next(error)
    }
}

exports.getOrder=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const order=await Order.findOne({id:id}).populate("ownerId").populate("userId");
        return res.status(200).send({
            status:"success",
            order
        })
    } catch (error) {
        next(error)
    }
}