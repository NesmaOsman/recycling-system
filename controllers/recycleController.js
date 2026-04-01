const User = require("../models/User");
const Transaction = require("../models/Transaction");
const logger = require("../utils/logger");

const recycleItem = async (req, res) => {
  try {
    const { userId, itemType } = req.body;

    if (!userId || !itemType) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // ⭐ POINTS RULES
    let pointsEarned = 0;

    switch (itemType) {
      case "plastic":
        pointsEarned = 5;
        break;
      case "glass":
        pointsEarned = 10;
        break;
      case "metal":
        pointsEarned = 15;
        break;
      default:
        return res.status(400).json({ message: "Invalid item type" });
    }

    // 1. create transaction
    const transaction = await Transaction.create({
      userId,
      itemType,
      pointsEarned,
    });

    // 2. update user points ⭐ FIXED HERE
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.points += pointsEarned;
    await user.save();

    // 3. response
    res.status(200).json({
      message: "Recycling successful",
      transaction,
      totalPoints: user.points,
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = {
  recycleItem,
};