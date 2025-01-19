const Product = require("../model/productModel");

// Get list of all products
const productsList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error retrieving products" });
  }
};

// Get product information by ID
const productInfo = async (req, res) => {
  try {
    const { productId } = req.params;
    // Use findById for a single product lookup

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error retrieving product" });
  }
};

module.exports = { productsList, productInfo };
