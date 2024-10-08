const mongoose = require("mongoose");

async function dbConnect() {
  return mongoose
    .connect(process.env.connectionString)
    .then(() => console.log("MongoDB connected"));
}

module.exports = {
  dbConnect,
};
