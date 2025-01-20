const { validateToken } = require("../services/auth");

function checkForAuthentication() {
  return (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
      res.status(401).json({ message: "No token, authorization denied" });
      return next();
    }

    try {
      const userPayload = validateToken(token);
      req.user = userPayload;
      // const { bidAmount, auctionItemId } = req.body;
      // req.bidData = { bidAmount, auctionItemId };
      // console.log(req.bidData);
      next();
    } catch (err) {
      // res.status(400).json({ message: "Token is not valid" });
      next();
    }
  };
}

module.exports = { checkForAuthentication };
