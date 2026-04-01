const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  itemType: {
    type: String,
    enum: ["plastic", "glass", "metal"],
    required: true
  },
  pointsEarned: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);