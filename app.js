const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = express();
app.use("/api/v1/", userRoutes);

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

app.all("*", (req, res) => {
  res.status(400).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});
