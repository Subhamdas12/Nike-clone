const { Product } = require("../models/Product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  product.discountPrice = Math.round(
    product.price * (1 - product.discount / 100)
  );
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.fetchProducts = async (req, res) => {
  let query = Product.find({});
  if (req.query.color) {
    query = query.find({ colors: { $in: req.query.color.split(",") } });
  }
  if (req.query.kids) {
    query = query.find({ kids: { $in: req.query.kids.split(",") } });
  }
  if (req.query.gender) {
    query = query.find({ gender: { $in: req.query.gender.split(",") } });
  }
  if (req.query.category) {
    query = query.find({
      category: { $in: req.query.category.split(",") },
    });
  }
  if (req.query.size) {
    query = query.find({ sizes: { $in: req.query.size.split(",") } });
  }
  try {
    const docs = await query.exec();
    res.status(200).json(docs);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).exec();
  try {
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
