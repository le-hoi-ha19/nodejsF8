// import model User vào
const User = require('../models/User');


const googleAuth = {
  // kiểm tra xem người dùng xem đã tồn tại trong cơ sở dữ liệu chưa
  // nếu tồn tại thì trả ra User already Registered
  checkUserGoogle: async (oauthUser) => {
    const isUserExists = await User.findOne({
      accountId: oauthUser.id,
      provider: oauthUser.provider,
    });
    if (isUserExists) {
      const failure = {
        message: 'Người dùng google đã có trong database',
      };
      return { failure };
    }

    // nếu chưa tồn tại thì lưu vào cơ sở dữ liệu với đầu vào của dữ liệu là object oauth
    // và trả ra thông báo là:User Registered
    const user = new User({
      accountId: oauthUser.id,
      name: oauthUser.displayName,
      provider: oauthUser.provider,
      email: oauthUser.emails[0].value, 
      photoURL: oauthUser.photos[0].value, 
    });
    await user.save();
    const success = {
      message: 'Người dùng google đăng ký thành công',
    };
    return { success };
  },

};

module.exports = googleAuth;
