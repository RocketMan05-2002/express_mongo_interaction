const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());

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

app.listen(8000, ()=>{
    console.log("server started via port 8000, as always ( use more ports!)");
})