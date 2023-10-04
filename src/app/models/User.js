const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const User = new mongoose.Schema(
  {
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    email: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
    },
    phonenumber: {
      type: String,
      unique: true,
    },
    authType: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },
    authGoogleID: {
      type: String,
      default: null,
    },
    authFacebookID: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      maxLength: 50,
      required: true,
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

// hàm này được gọi trước khi người dùng được lưu vào database
// dùng để mã hóa(băm) mật khẩu 
User.pre('save',async function(next){
  try{
    console.log('called before save', this.phonenumber,this.password)
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword
    next();
  }catch(error){
    next(error);
  }
})
module.exports = mongoose.model("User", User);
