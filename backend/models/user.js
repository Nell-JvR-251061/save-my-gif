const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{type: String, required: true, trim: true},
    surname:{type: String, required: true, trim: true},
    username:{type: String, required: true, trim: true, unique: true},
    email: {type: String, required: true, trim: true, lowercase: true, unique: true},
    password: {type: String, required: true, trim: true},
    authCode: {type: String, required: true, trim: true},
    gif: {type: String, trim: true}
},
{timestamps: true}
);

const User = mongoose.model("User", UserSchema);
module.exports = User;