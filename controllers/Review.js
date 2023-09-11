const { Review } = require("../models/Review");

exports.createReview = async (req, res) => {
  const { id } = req.user;
  const sameReview = await Review.find({
    $and: [{ product: req.body.product }, { user: id }],
  });
  if (sameReview.length) {
    return res.status(400).json({ message: "Review already exists" });
  }
  try {
    const review = new Review({ ...req.body, user: id });
    const doc = await review.save();
    const popDoc = await doc.populate("user", {
      id: 1,
      firstName: 1,
      lastName: 1,
    });
    res.status(201).json(popDoc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.fetchReviewByProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Review.find({ product: id }).populate("user", {
      id: 1,
      firstName: 1,
      lastName: 1,
    });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.fetchReviewByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await Review.find({ user: id }).populate("product");
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
