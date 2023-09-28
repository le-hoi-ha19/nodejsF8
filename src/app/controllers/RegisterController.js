const Account = require("../models/Account");

class RegisterController {
  index(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    async function RegisterUser(username,password) {
      try {
        const data = await Account.findOne({ username: username });
        if (data) {
          res.json("user này đã tồn tại");
        } else {
          Account.create({ username: username, password: password });
          res.json("Tao tai khoan thanh cong");
        }
      } catch {
        res.status(500).json("Tao tai khoan that bai");
      }
    }
    RegisterUser(username,password)
  }
}

module.exports = new RegisterController();
