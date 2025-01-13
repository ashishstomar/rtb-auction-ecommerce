const mongoose = require("mongoose");
const Product = require("../model/productModel");

async function seedDB() {
  const mongoURI = process.env.connectionString;

  const mockProducts = [
    {
      itemName: "Macintosh 128k 1978",
      itemDescription:
        "It is the first successful mass-market all-in-one desktop personal computer with a graphical user interface, built-in screen, and mouse.",
      itemBaseBid: "300.00",
      itemPicture:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Computer_macintosh_128k%2C_1984_%28all_about_Apple_onlus%29.jpg/1200px-Computer_macintosh_128k%2C_1984_%28all_about_Apple_onlus%29.jpg",
    },
    {
      itemName: "Apple II (original).",
      itemDescription:
        "Apple II is a series of microcomputers initially designed by Steve Wozniak, manufactured by Apple Computer (now Apple Inc.), and launched in 1977.",
      itemBaseBid: "200.00",
      itemPicture:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Apple_II-IMG_7064.jpg/1280px-Apple_II-IMG_7064.jpg",
    },
    {
      itemName: "The Nokia 9110",
      itemDescription: "Description for mock product 3.",
      itemBaseBid: "30.00",
      itemPicture:
        "https://upload.wikimedia.org/wikipedia/commons/1/18/Nokia-9110-2.jpg",
    },
  ];

  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
      console.log("Connected to MongoDB");

      // Clear existing products
      await Product.deleteMany({});

      // Insert mock products
      await Product.insertMany(mockProducts);
      console.log("Mock products added!");

      // Close the connection
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
    });
}

module.exports = seedDB;
