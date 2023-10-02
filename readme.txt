-------------------passport.authenticate()------------------------------
-chức năng: xem coi xác thực thành công hoặc thất bại để chuyển hướng
passport.authenticate(strategy, options, callback):
Phương thức này bắt đầu quá trình xác thực dựa trên chiến lược được chỉ định (ví dụ: "local", "google", "facebook").
options: Có thể bao gồm các tùy chọn xác thực như successRedirect(xác thực thành công thì điều hướng), failureRedirect(xác thực thất bại thì điều hướng).
callback: Hàm được gọi khi xác thực hoàn thành, nhận tham số (err, user, info). User là thông tin người dùng được xác thực, info chứa thông tin bổ sung nếu cần.


-------------------passport.use()--------------------------------
-chức năng: định nghĩa chiến lược xác thực.
-cấu trúc: passport.use(new ChiếnDịchXácThực(options, callback))

+options: 
(.) Là một đối tượng chứa thông tin cần thiết để thiết lập chiến lược xác thực.
(.) thường là: clientID, clientSecret, callbackURL, và scope là các thông số cần được cấu hình.
(.) scope: Phạm vi truy cập yêu cầu từ Google, trong trường hợp này, bao gồm thông tin "profile" và "email"

+callback:
(.) là Một hàm xử lý được gọi sau khi quá trình xác thực Google OAuth thành công.
(.) cấu trúc: callback(accessToken, refreshToken, profile, done)
(.) accessToken: Mã token được sử dụng để truy cập tài nguyên từ Google.
(.) refreshToken: Mã token dự phòng có thể được sử dụng để làm mới accessToken.
(.) profile: Thông tin hồ sơ người dùng từ Google, chứa thông tin như id, displayName, và emails.
(.) done: Một hàm callback để báo hiệu kết quả xác thực.
 Nếu xác thực thành công, bạn gọi done(null, user) với user là thông tin người dùng.
 
function(đốiTượngXácThực, done) {
  // Logic kiểm tra xác thực và gọi hàm done() để báo hiệu kết quả xác thực
}