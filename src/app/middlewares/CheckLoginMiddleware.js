const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = function CheckLoginMiddleware(req, res, next) {
  try {
    let idUser;
    if (req.session.tokengg) {
      var tokengoogle = req.session.tokengg;
      idUser = jwt.verify(tokengoogle, "mk");
      User.findOne({ _id: idUser }).then((data) => {
        if (data) {
          req.data = data;
          next();
        } else {
          res.json("not permission");
        }
      });
    } else {
      var token = req.cookies.token;
      idUser = jwt.verify(token, "mk");
      User.findOne({ _id: idUser }).then((data) => {
        if (data) {
          req.data = data;
          next();
        } else {
          res.json("not permission");
        }
      });
    }
  } catch (err) {
    console.log('bạn chưa đăng nhập, vui lòng đăng nhập nha!')
    return res.redirect("/login");
  }
};
