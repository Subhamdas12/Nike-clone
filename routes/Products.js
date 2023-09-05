const express = require("express");
const {
  createProduct,
  fetchProducts,
  fetchProductById,
  updateProductById,
  fetchProductYouMayAlsoLike,
} = require("../controllers/Product");
const { isAuth } = require("../constants/services");
const router = express.Router();
router
  .get("/fetchProducts", fetchProducts)
  .get("/fetchProductById/:id", fetchProductById)
  .get("/fetchProductYouMayAlsoLike", isAuth(), fetchProductYouMayAlsoLike)
  .post("/createProduct", createProduct)
  .patch("/updateProductById/:id", updateProductById),
  (exports.router = router);
