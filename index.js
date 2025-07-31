const mongoose = require("mongoose");

//connect
mongoose.connect("mongodb://127.0.0.1:27017/nemb58")
.then(()=>console.log("db connected, move! move! move!"))
.catch((err)=>console.log(err));

//schema
const userSchema = new mongoose.Schema({
    name:String,
    age:Number,
    location:String,
    isMarried:Boolean
});

//model
const UserModel = mongoose.model("User",userSchema);