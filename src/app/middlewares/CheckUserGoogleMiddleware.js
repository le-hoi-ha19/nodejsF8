// import model User vào
const User = require('../models/User');
const jwt = require('jsonwebtoken');


const googleAuth = {
  // kiểm tra xem người dùng xem đã tồn tại trong cơ sở dữ liệu chưa
  // nếu tồn tại thì trả ra User already Registered
  checkUserGoogle: async (profile) => {
    const isUserExists = await User.findOne({
      authGoogleID: profile.id,
      authType: "google",
    });
    if (isUserExists) {
      const tokenGoogle = jwt.sign({_id:isUserExists._id},'mk')

      const failure = {
        tokenGoogle,
        message: 'Người dùng google đã có trong database',
      };
      return { failure };
    }

    // nếu chưa tồn tại thì lưu vào cơ sở dữ liệu với đầu vào của dữ liệu là object oauth
    // và trả ra thông báo là:User Registered
    const user = new User({
      authGoogleID: profile.id,
      authType: "google",
      email: profile.emails[0].value, 
    });
    await user.save();
    const success = {
      message: 'Người dùng google đăng ký thành công',
    };
    return { success };
  },

};

module.exports = googleAuth;
