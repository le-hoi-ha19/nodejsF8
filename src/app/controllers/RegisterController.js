const Account = require("../models/Account");

class RegisterController {
  index(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    async function RegisterUser(username,password) {
      try {
        const data = await Account.findOne({ username: username });
        if (data) {
          res.json({
            message: 'Người dùng này đã tồn tại',
            success: false
          })
        } else {
          Account.create({ username: username, password: password,role: "student" });
          res.json({
            message: 'Tạo tài khoản thành công',
            success: true
          })
        }
      } catch {
        res.status(500);
      }
    }
    RegisterUser(username,password)
  }
  show(req, res, next)
  {
    res.render('register')
  }
}

module.exports = new RegisterController();
