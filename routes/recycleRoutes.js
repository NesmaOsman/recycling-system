const express = require("express");
const router = express.Router();

const User = require("../models/User");
const RecyclingTransaction = require("../models/RecyclingTransaction");

// POINT RULES
const pointsMap = {
  plastic: 5,
  glass: 10,
  paper: 3,
  metal: 8,
};

// =======================
// RECYCLE ENDPOINT
// =======================
router.post("/", async (req, res) => {
  try {
    const { userId, itemType } = req.body;

    // =======================
    // VALIDATION
    // =======================
    if (!userId || !itemType) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (!pointsMap[itemType]) {
      return res.status(400).json({ error: "Invalid item type" });
    }

    // =======================
    // CHECK USER EXISTS
    // =======================
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // =======================
    // CALCULATE POINTS
    // =======================
    const pointsEarned = pointsMap[itemType];

    // =======================
    // UPDATE USER POINTS (FIXED ✅)
    // =======================
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { points: pointsEarned } },
      { new: true }
    );

    // safety check
    if (!updatedUser) {
      return res.status(500).json({ error: "Failed to update user" });
    }

    // =======================
    // SAVE TRANSACTION
    // =======================
    const transaction = await RecyclingTransaction.create({
      userId,
      itemType,
      pointsEarned,
    });

    // =======================
    // RESPONSE
    // =======================
    res.status(201).json({
      message: "Recycling successful",
      transaction,
      totalPoints: updatedUser.points,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;