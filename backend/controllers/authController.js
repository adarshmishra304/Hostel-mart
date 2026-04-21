const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const data = req.body;

    // 🔍 CHECK BEFORE CREATE (ADD HERE 👇)
    const existing = await User.findOne({ email: data.email });

    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 🔐 Hash password
    const hashed = await bcrypt.hash(data.password, 10);

    // 👇 CREATE USER
    const user = await User.create({
      ...data,
      password: hashed
    });

    res.json(user);

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    let user;

    // 🔹 USER LOGIN
    if (role === "user") {
      user = await User.findOne({ username });
    }

    // 🔹 SELLER LOGIN
    else if (role === "seller") {
      user = await User.findOne({ email });
    }

    // ❌ If no user found
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 🔐 Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // 🔑 Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    // ✅ Success
    res.json({ user, token });

  } catch (err) {
    console.error("Login Error:", err);   // 🔥 shows real error in terminal
    res.status(500).json({ message: "Server error" });
  }
};