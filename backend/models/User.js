const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "seller"], required: true },

  name: String,
  username: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true },

  password: String,
  phone: String,
  age: Number,
  location: String,

  panId: String,
  upiId: String,
  aadhar: String
});

module.exports = mongoose.model("User", userSchema);