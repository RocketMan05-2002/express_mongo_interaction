const express = require("express");
const {
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
} = require("../controllers/user.controller");
const UserRouter = express();

//1. get all users
UserRouter.get("/all-users", getAllUsers);

//2. add user
UserRouter.post("/add-user", addUser);

//3. update a user
UserRouter.put("/update-user/:id", updateUserById);

//4. delete a user
UserRouter.delete("/delete-user/:id", deleteUserById);

//5. get all users below a certain age. eg: 25
UserRouter.get("/age/:age", allUserBelowAge);

//6. get all users of given gender
UserRouter.get("/gender", allOfGivenGender);

//7. get all users of given gender but with age restriction
UserRouter.get("/genderandage", allOfGivenGenderAge);

//8. pagination
UserRouter.get("/pagination", getUsersWithPagination);

//9. pagination with order
UserRouter.get("/paginationwithsort", getUsersWithPaginationOrder);

//10. filteration
UserRouter.get("/filter", filteration);

//11. dynamic sorting. parameter is dynamic in nature.
UserRouter.get("/sorting", getBySorting);

module.exports = UserRouter;
