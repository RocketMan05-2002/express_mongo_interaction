const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());

//connect
mongoose.connect("mongodb://127.0.0.1:27017/nemb58")
.then(()=>console.log("db connected, move! move! move!"))
.catch((err)=>console.log(err));

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

//1. get all users
app.get("/all-users", async (req,res)=>{
    try{
        const users = await UserModel.find();
        res.status(200).json({msg:"lsit of all users", users});
    }catch(err){
        res.status(500).json({msg:"Something went wrong please try again later"});
    }
})

//2. add user
app.post("/add-user",async (req,res)=>{
    try{
        const newUser = await UserModel.create(req.body);
        // console.log("hey");
        res.status(201).json({msg:"user added", newUser});
    }catch(err){
        console.error("ERROR CREATING USER:", err); // 👈 log full error
        res.status(500).json({ msg: "something went wrong", error: err.message }); // 👈 expose message
    }
})

//3. update a user
app.put("/update-user/:id", async (req,res)=>{
    try{
        const id = req.params.id;
        const updatedUser = await UserModel.findByIdAndUpdate(id,req.body,{new:true});
        res.status(201).json({msg:"user updated", updatedUser});
    }catch(err){
        res.status(500).json({msg:"Something went wrong please try again later"});
    }
})

//4. delete a user
app.delete("/delete-user/:id", async (req,res)=>{
    try{
        const id = req.params.id;
        const deletedUser = await UserModel.findByIdAndDelete(id);
        res.status(201).json({msg:"user deleted", deletedUser});
    }catch(err){
        res.status(500).json({msg:"Something went wrong please try again later"});   
    }
})

app.listen(8000, ()=>{
    console.log("server started via port 8000, as always ( use more ports!)");
})