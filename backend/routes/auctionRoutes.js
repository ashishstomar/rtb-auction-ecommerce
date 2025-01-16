const express = require("express");
const router = express.Router();
const auctionController = require("../controllers/auctionController");

router.get("/state", auctionController.getAuctionState);
router.post("/bid", auctionController.placeBid);

module.exports = router;
