const express = require("express");
const { getAllUsers, addUser, updateUserById, deleteUserById } = require("../controllers/user.controller");
const UserRouter = express();

//1. get all users
UserRouter.get("/all-users", getAllUsers);

//2. add user
UserRouter.post("/add-user", addUser);

//3. update a user
UserRouter.put("/update-user/:id", updateUserById);

//4. delete a user
UserRouter.delete("/delete-user/:id", deleteUserById);

module.exports = UserRouter;