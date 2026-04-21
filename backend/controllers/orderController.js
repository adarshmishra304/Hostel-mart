const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
};

exports.getOrdersByUser = async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
};