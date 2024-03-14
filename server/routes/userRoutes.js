const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  loginUser,
  deleteUser,
} = require("../controllers/UserController");
const express = require("express");
const validateToken = require("../utilities/validateToken");
const router = express.Router();

// validateToken is a middleware that checks if the user is authenticated
router.post("/login", loginUser);
router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
