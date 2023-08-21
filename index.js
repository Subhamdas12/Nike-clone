require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const path = require("path");
//middlewares
server.use(express.static(path.resolve(__dirname, "build")));
server.use(express.json());
server.use(cors({}));

main().catch((err) => console.log(err));
const port = process.env.PORT || 8080;
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connected");
}
server.listen(port, () => {
  console.log("Server started");
});
