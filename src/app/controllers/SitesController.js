const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongooses')

class SitesController {

   // [GET] /
   index(req, res,next) {
      Course.find({})
      // render file home.hbs và truyền dữ liệu courses từ đây sang file home.hbs
      .then(courses => {
         res.render('home',{
            courses: mutipleMongooseToObject(courses)
         })
      })
      .catch(next);

      // .then(courses=>(res.json(courses)));
      // .catch(err =>(res.status(400).json({error: "ERROR...!!!"})))
   
      //res.render('home');
   }

   // [GET] /search
   search(req, res) {
      res.render('search');
   }
}

module.exports = new SitesController;