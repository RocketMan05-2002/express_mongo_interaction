const UserModel = require("../models/User.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ msg: "lsit of all users", users });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Something went wrong please try again later" });
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    // console.log("hey");
    res.status(201).json({ msg: "user added", newUser });
  } catch (err) {
    console.error("ERROR CREATING USER:", err); // 👈 log full error
    res.status(500).json({ msg: "something went wrong", error: err.message }); // 👈 expose message
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({ msg: "user updated", updatedUser });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Something went wrong please try again later" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    res.status(201).json({ msg: "user deleted", deletedUser });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Something went wrong please try again later" });
  }
};

const allUserBelowAge = async (req, res) => {
  try {
    const age = req.params.age;
    const users = await UserModel.find({ age: { $lt: age } });
    res.send({ users });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "something went wrong please try again later" });
  }
};

const allOfGivenGender = async (req, res) => {
  try {
    const gender = req.query.gender;
    const users = await UserModel.find({ gender: gender });
    res.send({ users });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "something went wrong please try again later" });
  }
};

const allOfGivenGenderAge = async (req, res) => {
  try {
    const { gender, age } = req.query;
    const users = await UserModel.find({
      $and: [{ gender: gender }, { age: { $lt: age } }],
    });
    res.send({ users });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "something went wrong please try again later" });
  }
};

const getUsersWithPagination = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skipped = (page - 1) * limit;
    const users = await UserModel.find().skip(skipped).limit(limit);
    res.send({ users });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "something went wrong please try again later" });
  }
};

const getUsersWithPaginationOrder = async (req, res) => {
  try {
    const { page, limit, order } = req.query;
    const skipped = (page - 1) * limit;
    let sort = "";
    if (order == "asc") sort = 1;
    else sort = -1;
    const users = await UserModel.find()
      .skip(skipped)
      .limit(limit)
      .sort({ name: sort });
    res.send({ users });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "something went wrong please try again later" });
  }
};

const filteration = async (req, res) => {
  try {
    const { name, email, location, page, limit, order } = req.query;
    let skipped = (page - 1) * limit;
    let filter = {};
    let sort = "";
    if (order == "asc") sort = 1;
    else sort = -1;
    if (name) {
      filter.name = name;
    }
    if (email) {
      filter.email = email;
    }
    if (location) {
      filter.location = location;
    }
    const users = await UserModel.find(filter)
      .skip(skipped)
      .limit(limit)
      .sort({ name: sort });
    res.send({ users });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "something went wrong please try again later" });
  }
};

// filteration is a huge demerit of nodejs
// here django works really amazing
const filterationWithOr = async (req, res) => {
  try {
    const { name, email, location, page, limit, order } = req.query;
    let skipped = (page - 1) * limit;
    let filter = {};
    let sort = "";
    if (order == "asc") sort = 1;
    else sort = -1;
    if (name) {
      filter = { $or: [{ name: name }] };
    } else if (name && email) {
      filter = { $or: [{ name }, { email }] };
    } else if (name && email && location) {
      filter = { $or: [{ name }, { email }, { location }] };
    }
    const users = await UserModel.find(filter)
      .skip(skipped)
      .limit(limit)
      .sort({ name: sort });
    res.send({ users });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "something went wrong please try again later" });
  }
};

const getBySorting = async (req, res) => {
  try {
    const { name, email, location, page, limit, order, sort } = req.query;
    let skipped = (Number(page) - 1) * Number(limit);
    let sortingEle = sort || "name";
    let orderEle = order === "asc" ? 1 : -1;
    if (order == "asc") {
      orderEle = 1;
    } else {
      orderEle = -1;
    }
    let filter = {};
    if (name) {
      filter.name = name;
    }
    if (email) {
      filter.email = email;
    }
    if (location) {
      filter.location = location;
    }
    let users = await UserModel.find(filter)
      .skip(skipped)
      .limit(Number(limit))
      .sort({ [sortingEle]: orderEle });
    res.send({ users });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "something went wrong please try again later" });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  updateUserById,
  deleteUserById,
  allUserBelowAge,
  allOfGivenGender,
  allOfGivenGenderAge,
  getUsersWithPagination,
  getUsersWithPaginationOrder,
  filteration,
  getBySorting,
};
