const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        required: true
    },
    
    disabled: {
        type: String,
        enum: ["Visual", "Hearing", "Motor", "MentalHealth"],
        required: true
    }

});

userSchema.pre("save", function (next) {
    this.id = String(this._id);
    next();
});

const User = model("User", userSchema);
module.exports.User = User;