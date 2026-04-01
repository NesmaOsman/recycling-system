const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();


// =======================
// REGISTER (FORCED DEBUG VERSION)
// =======================
router.post("/register", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    console.log("EXTRACTED:", { name, email, password });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    console.log("SAVED USER:", savedUser);

    res.json({
      message: "User created successfully",
      user: savedUser,
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// =======================
// LOGIN
// =======================
router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });

    console.log("FOUND USER:", user);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user,
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;