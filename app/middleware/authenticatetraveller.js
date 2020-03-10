var {Traveller}= require('./../models/travellersignup');

var authenticatetraveller = (req,res,next)=>{
    var token = req.header('x-auth');
    console.log(token);
    Traveller.findByToken(token).then((traveller)=>{
        if(!traveller){
            return Promise.reject();
        }
        req.traveller=traveller;
        req.token =token;
        next();
    }).catch((err)=>{
        res.status(401).send();
    })
};



 module.exports={authenticatetraveller};





