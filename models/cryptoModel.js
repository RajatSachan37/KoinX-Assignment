const mongoose = require("mongoose");

const cryptoSchema = mongoose.Schema({
  cryptoName: { type: String, required: true, unique: true },
  currentPrice: { type: Number, required: true },
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

module.exports = Crypto;
