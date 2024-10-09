const { Router } = require("express");
const {
  handleUserSignup,
  handleUserSignin,
} = require("../controllers/userController");

const router = Router();

router.post("/signin", handleUserSignin);
router.post("/signup", handleUserSignup);

module.exports = router;
