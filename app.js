const express = require("express");
// const fetch = require("node-fetch");
const mongoose = require("mongoose");
// const User = require("./models/userModel");
// const Crypto = require("./models/cryptoModel");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");

const app = express();

app.use("/api/v1/", userRoutes);

dotenv.config({ path: "./config.env" });
const DB = process.env.DB_CONNECTION_STRING;

mongoose.set("strictQuery", true);
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("KoinX Assignment");
});

app.listen(3000, process.env.IP, () => {
  console.log("Server has started on port 3000");
});
