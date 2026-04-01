const express = require("express");
const router = express.Router();

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");


router
  .route("/users")
  .post(createUser)
  .get(getAllUsers);

router
  .route("/users/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
