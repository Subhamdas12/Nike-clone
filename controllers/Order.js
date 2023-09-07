require("dotenv").config();
const crypto = require("crypto");
const { Order } = require("../models/Order");
const Razorpay = require("razorpay");
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const doc = await order.save();
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.createOrderWithCard = async (req, res) => {
  try {
    let instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    var options = {
      amount: req.body.totalAmount * 100,
      currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }
      return res.status(200).json({ order });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.validateOrderWithCard = async (req, res) => {
  const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
  } else {
    // pass it
  }
  res.json({ status: "ok" });
};
