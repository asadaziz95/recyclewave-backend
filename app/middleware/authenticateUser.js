var {User}= require('./../models/User');

var authenticateUser = (req,res,next)=>{
    var token = req.header('x-auth');
    console.log(req);
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        req.user=user;
        req.token =token;
        next();
    }).catch((err)=>{
        res.status(401).send();
    })
};



 module.exports={authenticateUser};





