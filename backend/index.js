require("dotenv").config();
const express = require("express");

const { dbConnect } = require("./dbConnect");
const router = require("./routes/userRoute");
const server = express();
dbConnect();

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
