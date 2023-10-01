const Account = require("../models/Account");

module.exports = function CheckStudentMiddleware(req,res,next){

    var role= req.data.role
    if(role === 'student' || role === 'teacher' || role === 'manager'){
        next()
    }else{
        res.json("not permission")
    }
}