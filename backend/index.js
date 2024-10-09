require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./dbConnect");
const router = require("./routes/userRoute");
const server = express();
dbConnect();

server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

server.use(express.urlencoded({ extended: false })); //handle form data

server.use("/api", router);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
