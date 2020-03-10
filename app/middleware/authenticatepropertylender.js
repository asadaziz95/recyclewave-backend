var {PropertyLender}= require('./../models/propertylendersignup');

var authenticatepropertylender = (req,res,next)=>{
    var token = req.header('x-auth');
    
    console.log("token");
    console.log(token)
    PropertyLender.findByToken(token).then((propertylender)=>{
        if(!propertylender){
            return Promise.reject();
        }
        req.propertylender=propertylender;
        req.token =token;
        next();
    }).catch((err)=>{
        res.status(401).send(err);
    })
};

 module.exports={authenticatepropertylender};
