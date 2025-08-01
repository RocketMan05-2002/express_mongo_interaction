const mongoose = require("mongoose");

const connectToDb = () => {
  //connect
  mongoose
    .connect("mongodb://127.0.0.1:27017/nemb58")
    .then(() => console.log("db connected, move! move! move!"))
    .catch((err) => console.log(err));
};

module.exports = connectToDb;
