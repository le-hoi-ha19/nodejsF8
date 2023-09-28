const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongooses");

class CoursesController {
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  create(req, res, next) {
    res.render("courses/create");
  }

  store(req, res, next) {

    //dữ liệu người dùng gửi lên k có image nên dựa vào id video gửi lên từ người dùng để ối chuổi--> lấy ảnh khi video chưa phát
    req.body.image = `https://img.youtube.com/vi/${req.body.videoid}/sddefault.jpg`;
    // tạo mới 1 đối tượng course mới không có dữ liệu là : const course = new Course();
    // và truyền dữ liệu từ client gửi lên vào Course qua req.body: const course = new Course(req.body);
    const course = new Course(req.body);
    course.save() //course.save sẽ trả về 1 promise--> phải dùng .then và .catch
      .then(() => res.redirect("back"))
      .catch((error) => {});
  }
  //[GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", {
          course: mongooseToObject(course),
        })
      )
      .catch(next);
  }

  //[PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  //[DELETE] /courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[DELETE] /courses/:id/force
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [POST] /courses/handle-form-actions
  handleFormActions(req,res,next){
    switch(req.body.action){
      case 'delete':
        Course.delete({ _id: {$in: req.body.courseIds} })
        .then(() => res.redirect("back"))
        .catch(next);
        break;
      case 'restore':
        Course.restore({ _id: {$in: req.body.courseIds} })
        .then(() => res.redirect("back"))
        .catch(next);
        break;
        case 'deleteForce':
          Course.deleteMany({ _id: {$in: req.body.courseIds} })
          .then(() => res.redirect("back"))
          .catch(next);
          break;
      default:
        res.json({action:'Action is invalid'});
    }
  }
}

module.exports = new CoursesController();

