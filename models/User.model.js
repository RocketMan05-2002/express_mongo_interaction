const mongoose = require("mongoose");

// schema
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type:String, required: true, unique: true},
    age: {type:Number, required : true, min: 20, max: 120},
    location: String,
    isMarried: Boolean,
    gender:{type:String, enum:["male","female"]},
    password: {type:String, default: "pass123"}
});

//model
const UserModel = mongoose.model("User",userSchema);

module.exports = UserModel;