const express = require("express");
const {
  createProduct,
  fetchProducts,
  fetchProductById,
} = require("../controllers/Product");
const router = express.Router();
router
  .get("/fetchProducts", fetchProducts)
  .get("/fetchProductById/:id", fetchProductById)
  .post("/createProduct", createProduct);
exports.router = router;
