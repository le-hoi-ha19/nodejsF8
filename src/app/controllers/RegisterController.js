const User = require('../models/User');

class RegisterController {
  index(req, res, next) {
    // var phonenumber = req.body.phonenumber;
    // var password = req.body.password;
    const{phonenumber, password} = req.body;
    
    async function RegisterUser(phonenumber,password) {
      try {
        const data = await User.findOne({ phonenumber: phonenumber });
        if (data) {
          res.json({
            message: 'Người dùng này đã tồn tại',
            success: false
          })
        } else {
          // thay user.create bằng new User để hỗ trợ bcrypt
          // User.create({ phonenumber: phonenumber, password: password });
          const user = new User({phonenumber, password});
          const savedUser = await user.save()
          res.json({
            message: 'Tạo tài khoản thành công',
            success: true
          })
        }
      } catch {
        res.status(500);
      }
    }
    RegisterUser(phonenumber,password)
  }
  show(req, res, next)
  {
    res.render('register')
  }
}

module.exports = new RegisterController();
