const jwt = require('jsonwebtoken');
const Account = require("../models/Account");


module.exports = function CheckLoginMiddleware(req,res,next){
    try{
        var token = req.cookies.token;
        var idUser = jwt.verify(token,'mk')
        Account.findOne({_id:idUser})
        .then(data =>{
            if(data){
                req.data= data
                next()
            }else{
                res.json('not permission')
            }
        })

    }catch(err){
        return res.redirect('/login')
        // res.status(500).json("token không hợp lệ")
    }
}