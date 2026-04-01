const mongoose = require("mongoose");

const recyclingTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  itemType: {
    type: String,
    required: true,
    enum: ["plastic", "glass", "paper", "metal"],
  },

  pointsEarned: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RecyclingTransaction", recyclingTransactionSchema);