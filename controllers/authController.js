const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER
const register = async (req, res) => {
  try {
    const { name, password } = req.body;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created successfully"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }

    res.json({
      message: "Login successful"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };