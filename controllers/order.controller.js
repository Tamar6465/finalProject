const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { Order } = require("../models/order.model");
const orderJoiSchema = {
    add: Joi.object().keys({
        dateOrder: Joi.date().required(),
        dateStart: Joi.date().required(),
        dateEnd: Joi.date().required(),
        sumOrser: Joi.number().required()
    }),
    update:
        Joi.object().keys({
            dateOrder: Joi.date(),
            dateStart: Joi.date(),
            dateEnd: Joi.date(),
            sumOrser: Joi.number()
        }),
};

exports.addOrder = async (req, res, next) => {
    const body = req.body;
    try {
        const validate = orderJoiSchema.add.validate(body);
        if (validate.error) {
            throw Error(validate.error);
        }
        if (dateStart.getTime()>=dateEnd.getTime()) {
            throw new Error("date invalid")
        }
        const today = new Date(); // יצירת תאריך ליום הנוכחי
        if(dateStart.getTime() <= today.getTime()){
            throw new Error("date invalid")
        }
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
        if (dateStart.getTime()>=dateEnd.getTime()) {
            throw new Error("date invalid")
        }
        const today = new Date(); // יצירת תאריך ליום הנוכחי
        if(dateStart.getTime() <= today.getTime()){
            throw new Error("date invalid")
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
