const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  services: Array,
  total: Number,
  date: String,
  time: String
});

module.exports = mongoose.model("Order", OrderSchema);