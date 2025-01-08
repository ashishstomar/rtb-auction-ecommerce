const express = require("express");
const router = express.Router();

const {
  productsList,
  productInfo,
} = require("../controllers/productController");

router.get("/list", productsList);
router.get("/list/:productId", productInfo);

module.exports = router;
