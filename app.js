const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());


const authRoutes = require("./routes/authRoutes");
const recycleRoutes = require("./routes/recycleRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/recycle", recycleRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.log("DB error:", err);
  });
