const express = require("express");
const app = express();
app.use(express.json());
const UserRouter = require("./routers/user.router");
const connectToDb = require("./configs/mongo.db");

connectToDb();

app.use("/users", UserRouter);

app.listen(8000, ()=>{
    console.log("server started via port 8000, as always ( use more ports!)");
})