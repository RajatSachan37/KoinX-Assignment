const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  transactions: { type: Array, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
