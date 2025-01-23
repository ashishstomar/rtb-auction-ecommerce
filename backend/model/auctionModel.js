const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  product: { type: String, required: true },
  currentBid: { type: Number, required: true, default: 0 },
  lastBidder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timer: { type: Number, default: 30 }, // Timer in seconds
});

module.exports = mongoose.model("Auction", auctionSchema);

/*

const mongoose = require("mongoose");

const AuctionSchema = new mongoose.Schema({
  productName: String,
  currentBid: Number,
  currentBidder: String,
  winner: String, // Winner of the auction
  auctionEndTime: Date, // Auction end time
  buyNowEnabled: { type: Boolean, default: false }, // Flag to check if Buy Now button is available
  buyNowTimeLimit: Date, // Time limit for Buy Now after auction ends
  auctionStatus: { type: String, default: "ongoing" }, // Status of the auction ('ongoing', 'ended', 'purchased')
});

Auction = mongoose.model("Auction", AuctionSchema);

module.exports = Auction;


*/
