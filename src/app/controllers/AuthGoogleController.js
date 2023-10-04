const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const googleAuth = require("../middlewares/CheckUserGoogleMiddleware");
const dotenv = require("dotenv").config(); // caì để lấy giá trị của biến trong file .env

var userProfile;
// gửi lên 1 xác thực cho google nhận lại dữ liệu từ google
passport.use(
  // (chạy cái này thứ 3)
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

class AuthGoogleController {
  // yêu cầu quyền từ google để lâý profile và email từ google
  RequestPermission(req, res, next) {
    // (chạy cái này thứ 1)
    passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  }
  // dựa vào kết quả yêu cầu quyền để điều hướng trang
  // xác thực thành công -> điều hướng đến route: /auth/google/success
  // xác thực thất bại -> điều hướng đến route /auth/google/error
  //  để (req, res, next) ở cuối để hàm này thành 1 middleware, k để đó thì nó sẽ là 1 hàm thường và k dùng trong route được
  authenCallback(req, res, next) {
    // (chạy cái này thứ 2)
    passport.authenticate("google", {
      failureRedirect: "/auth/google/error",
      successRedirect: "/auth/google/success",
    })(req, res, next);
  }

  // xác thực thành công với google và nhận được dữ liệu trả về từ google là userProfile
  // kiểm tra xem userProfile đó tồn tại trong database chưa
  // nếu chưa thì tạo 1 bản ghi trong database với dữ liệu là userProfile
  // nếu rồi thì in ra thông báo người dùng đã tồn tại
  async AuthSuccess(req, res, next) {
    // (chạy cái này thứ 6)
    // req.user được lấy từ session
    const { failure, success } = await googleAuth.checkUserGoogle(req.user);
    if (failure) {
      console.log(failure.message);
      req.session.tokengg = failure.tokenGoogle;
    } else {
      console.log(success.message);
    }
    res.redirect("/")
  }

  // xác thực thất bại với google
  AuthFail(req, res, next) {
    res.send("Lỗi xác thực google!!!");
  }

  // đăng xuất khỏi google
  Signout(req, res, next) {
    try {
      req.session.destroy(function (err) {
        console.log("Đăng xuất thành công!");
      });
      res.redirect("/login");
    } catch (err) {
      res.status(400).send({ message: "Đăng xuất thất bại" });
    }
  }
}

module.exports = new AuthGoogleController();
