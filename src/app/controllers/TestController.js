const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongooses");

class TestController {
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.json(courses);
      })
      .catch(next);
  }

  show(req, res) {
    res.send("test detail");
  }
}

module.exports = new TestController();
