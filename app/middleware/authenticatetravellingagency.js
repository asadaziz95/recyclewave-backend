var {TravellingAgency}= require('./../models/travellingagencysignup');

var authenticatetravellingagency = (req,res,next)=>{
    var token = req.header('x-auth');
    TravellingAgency.findByToken(token).then((travellingagency)=>{
        if(!travellingagency){
            return Promise.reject();
        }
        req.travellingagency=travellingagency;
        req.token =token;
        next();
    }).catch((err)=>{
        res.status(401).send();
    })
};

 module.exports={authenticatetravellingagency};
