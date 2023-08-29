require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const path = require("path");
const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const colorsRouter = require("./routes/Colors");
const sizesRouter = require("./routes/Sizes");
//middlewares
server.use(express.static(path.resolve(__dirname, "build")));
server.use(cors({}));
server.use(express.json());
server.use("/products", productsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/colors", colorsRouter.router);
server.use("/sizes", sizesRouter.router);
server.get("*", (req, res) => {
  res.sendFile(path.resolve("build", "index.html"));
});
main().catch((err) => console.log(err));
const port = process.env.PORT || 8080;
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connected");
}

server.listen(port, () => {
  console.log("Server started");
});
