const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
  },
  password: {
    type: String,
    // required: [true, "Password is required"],
  },
  token: {
    type: String,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
