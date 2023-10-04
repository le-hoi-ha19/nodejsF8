const User = require('../models/User');
// dùng json web token
const jwt = require('jsonwebtoken');



class LoginController {
  index(req, res, next) {
    // var phonenumber = req.body.phonenumber;
    // var password = req.body.password;
    const{phonenumber, password} = req.body;

    async function LoginUser(phonenumber, password) {
      try {
        const data = await User.findOne({
          phonenumber: phonenumber,
          password: password,
        });
        if (data) {
          var token = jwt.sign({
            _id:data._id
          },'mk')
          res.json({
            message: 'Đăng nhập thành công',
            token: token
          })
        } else {
          res.status(300).json("tài khoản không đúng");
        }
      } catch(err) {
        console.log(err);
        res.status(500).json("đăng nhập thất bại");
      }
    }
    LoginUser(phonenumber, password);
  }
  inputLogin(req, res, next) {
    res.render("login")
  }
}

module.exports = new LoginController();
