const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Account = new Schema({
  //required: true trường đó bắt buộc phải nhập
  // thêm trường role để phân quyền trang người dùng có thể xem được
  username: { type: String, maxLength: 50, required: true, unique: true },
  password: { type: String, maxLength: 50,required: true },
  role: { type: String, maxLength: 50, required: true}
});

module.exports = mongoose.model("Account", Account);
