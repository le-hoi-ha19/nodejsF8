const jwt = require('jsonwebtoken');
const Account = require("../models/Account");
module.exports = function CheckManagerMiddleware(req,res,next){
    var role= req.data.role
    if( role === 'manager'){
        next()
    }else{
        res.json("not permission")
    }
}