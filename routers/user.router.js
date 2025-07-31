const express = require("express");
const UserRouter = express();
const UserModel = require("../models/User.model");

//1. get all users
UserRouter.get("/all-users", async (req,res)=>{
    try{
        const users = await UserModel.find();
        res.status(200).json({msg:"lsit of all users", users});
    }catch(err){
        res.status(500).json({msg:"Something went wrong please try again later"});
    }
})

//2. add user
UserRouter.post("/add-user",async (req,res)=>{
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
UserRouter.put("/update-user/:id", async (req,res)=>{
    try{
        const id = req.params.id;
        const updatedUser = await UserModel.findByIdAndUpdate(id,req.body,{new:true});
        res.status(201).json({msg:"user updated", updatedUser});
    }catch(err){
        res.status(500).json({msg:"Something went wrong please try again later"});
    }
})

//4. delete a user
UserRouter.delete("/delete-user/:id", async (req,res)=>{
    try{
        const id = req.params.id;
        const deletedUser = await UserModel.findByIdAndDelete(id);
        res.status(201).json({msg:"user deleted", deletedUser});
    }catch(err){
        res.status(500).json({msg:"Something went wrong please try again later"});   
    }
})

module.exports = UserRouter;