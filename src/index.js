const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');



const SortMiddleware = require('./app/middlewares/SortMiddleware');
const CheckLoginMiddleware = require('./app/middlewares/CheckLoginMiddleware');
const CheckStudentMiddleware = require('./app/middlewares/CheckStudentMiddleware');
const CheckTeacherMiddleware = require('./app/middlewares/CheckTeacherMiddleware');
const CheckManagerMiddleware = require('./app/middlewares/CheckManagerMiddleware');


const route = require("./routes");
const db = require("./config/db");

// connect to db
db.connect();


const app = express();
const port = 3000;

// cấu hình lại session để dùng
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);
// để khởi tạo Passport, thường được đặt trước mọi tuyến đường trong ứng dụng.
app.use(passport.initialize());
// để duy trì trạng thái xác thực của người dùng qua các yêu cầu
app.use(passport.session());
// lưu thông tin xác thực của người dùng vào session
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
// lấy thông tin xác thực của người dùng từ session và biến nó thành một đối tượng 
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});



app.use(cookieParser())
// app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// custome middleware
app.use(SortMiddleware);
app.use('/product',CheckLoginMiddleware,CheckTeacherMiddleware)
app.use('/courses/create',CheckLoginMiddleware,CheckTeacherMiddleware)
app.use('/me/trash/courses',CheckLoginMiddleware,CheckTeacherMiddleware)
app.use('/me/stored/courses',CheckLoginMiddleware,CheckTeacherMiddleware)

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: {
      // Function to do basic mathematical operation in handlebar
      math: function (lvalue, operator, rvalue) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
          "+": lvalue + rvalue,
          "-": lvalue - rvalue,
          "*": lvalue * rvalue,
          "/": lvalue / rvalue,
          "%": lvalue % rvalue,
        }[operator];
      },
      sortable: (field,sort) =>{
        const sortType = field === sort.column ? sort.type : 'default';
        const icons ={
          default: 'oi oi-elevator',
          asc: 'oi oi-sort-ascending',
          desc: 'oi oi-sort-descending',
        }
      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc',
      }

       const icon = icons[sort.type];
       const type = types[sort.type];

        return `<a href="?_sort&column=${field}&type=${type}">
        <span class="${icon}"></span>
        </a>`;
      }
    },
  })
);

app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use(express.static(path.join(__dirname, "public")));

route(app);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
