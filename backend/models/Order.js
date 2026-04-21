const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  quantity: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);