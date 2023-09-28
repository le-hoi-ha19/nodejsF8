const Account = require("../models/Account");
// dùng json web token
const jwt = require('jsonwebtoken');



class LoginController {
  index(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    async function LoginUser(username, password) {
      try {
        const data = await Account.findOne({
          username: username,
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
    LoginUser(username, password);
  }
  inputLogin(req, res, next) {
    res.render("login")
  }
}

module.exports = new LoginController();
