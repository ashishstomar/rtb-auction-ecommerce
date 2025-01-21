const Bid = require("../model/bidModel");
const User = require("../model/userModel");

// Get auction state (current bid, highest bidder)
exports.getAuctionState = async (req, res) => {
  try {
    const bids = await Bid.find().sort({ amount: -1 }).limit(1);
    const highestBid = bids[0] ? bids[0].amount : 500;
    const currentBidder = bids[0] ? bids[0].user : null;
    res.json({ highestBid, currentBidder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Place a bid
exports.placeBid = async (req, res) => {
  const { user, amount } = req.body;

  try {
    const newBid = new Bid({ user, amount });
    await newBid.save();
    res.status(201).json(newBid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
