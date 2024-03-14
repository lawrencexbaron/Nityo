const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { createValidation } = require("../utilities/validation");

// @route  GET /users
// @desc   Get all users
// @access Public
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ deletedAt: null });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// @route  POST /users
// @desc   Create a user
// @access Public
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    // if password is not provided, set it to "password"
    if (!password) {
      password.value = "password";
    }

    const { error } = createValidation(req.body);

    const emailExist = await User.findOne({ email: email, deletedAt: null });
    if (emailExist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).json({ error: messages });
    }

    // check if email already exists

    let hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.TOKEN_KEY
    );

    user.token = token;
    await user.save();

    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// @route  GET /users/:id
// @desc   Get a user
// @access Public
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// @route  PUT /users/:id
// @desc   Update a user
// @access Public
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// @route  DELETE /users/:id
// @desc   Delete a user
// @access Public
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.deletedAt = new Date();
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// @route POST /users/login
// @desc Login a user
// @access Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, deletedAt: null }).select(
      "+password"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.TOKEN_KEY
    );
    user.token = token;
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  loginUser,
  deleteUser,
};
