const express = require("express");
const {
  createOrder,
  createOrderWithCard,
  validateOrderWithCard,
} = require("../controllers/Order");
const router = express.Router();
router
  .post("/createOrder", createOrder)
  .post("/createOrderWithCard", createOrderWithCard);

exports.router = router;
