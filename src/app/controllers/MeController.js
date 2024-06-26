const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongooses");

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    // res.json(res.locals._sort);
    let courseQuery = Course.find({});
    if(req.query.hasOwnProperty('_sort')){
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type
      });
    }


    Promise.all([courseQuery, Course.findWithDeleted({ deleted: true }).countDocuments()])
      .then(([courses, deletedCount]) =>
        res.render("me/stored-courses", {
          deletedCount,
          courses: mutipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
  
  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .then((courses) => {
        res.render("me/trash-courses", {
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
