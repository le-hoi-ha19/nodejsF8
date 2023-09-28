const jwt = require('jsonwebtoken');
const Account = require("../models/Account");
module.exports = function CheckTeacherMiddleware(req,res,next){

    var role= req.data.role
    if( role === 'teacher' || role === 'manager'){
        next()
    }else{
        res.json("not permission")
    }
    
}