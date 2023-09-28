const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
  //required: true trường đó bắt buộc phải nhập
  name: { type: String, maxLength: 50, required: true, unique: true },
  cost: { type: Number, required: true }
});

module.exports = mongoose.model("Product", Product);
