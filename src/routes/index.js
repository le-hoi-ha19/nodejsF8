const newsRouter = require('./news');
const siteRouter = require('./sites');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const testRouter = require('./test');
const loginRouter = require('./login');
const registerRouter = require('./register');
const productsRouter = require('./product');
function route(app) {
   app.use('/login', loginRouter)
   app.use('/register', registerRouter)
   app.use('/test',testRouter);
   app.use('/news', newsRouter);
   app.use('/courses', coursesRouter);
   app.use('/me', meRouter);
   app.use('/', siteRouter);
   app.use('/product', productsRouter);

}

module.exports = route;

