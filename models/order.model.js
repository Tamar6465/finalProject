const { string } = require("joi");
const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    id: {
        type: string,
        required: false
    },
    dateOrder:{
        type:Date,
        required:true
    },
    dateStart:{
        type:Date,
        required:true
    },
    dateEnd:{
        type:Date,
        required:true
    },
    sumOrder:{
        type:Number,
        required:true
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: "Owner",
        required: true
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
});
orderSchema.pre("save", function (next) {
    this.id = String(this._id);
    next();
});

const Order = model("Owner", orderSchema);
module.exports.Order = Order;