require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./dbConnect");
const router = require("./routes/userRoute");
const server = express();
dbConnect();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
