const express = require("express");
const { placeBid, getBidsByUser } = require("../controllers/bidController");

const { checkForAuthentication } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/placebid", checkForAuthentication, placeBid);
router.post("/user", checkForAuthentication, getBidsByUser);

module.exports = router;
