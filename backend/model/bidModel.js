const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  user: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bid", bidSchema);
