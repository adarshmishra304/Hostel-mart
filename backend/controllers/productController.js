const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};


exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating product" });
  }
};