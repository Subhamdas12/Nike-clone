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
server.get("*", (req, res) => {
  res.sendFile(path.resolve("build", "index.html"));
});
main().catch((err) => console.log(err));
const port = process.env.PORT || 8080;
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connected");
}
server.get("/", (req, res) => {
  res.send("Hello World!");
});
server.listen(port, () => {
  console.log("Server started");
});
