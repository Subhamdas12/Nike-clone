const express = require("express");
const {
  createProduct,
  fetchProducts,
  fetchProductById,
  updateProductById,
} = require("../controllers/Product");
const router = express.Router();
router
  .get("/fetchProducts", fetchProducts)
  .get("/fetchProductById/:id", fetchProductById)
  .post("/createProduct", createProduct)
  .patch("/updateProductById/:id", updateProductById),
  (exports.router = router);
