const _ = require('lodash');
const {Traveller} = require('./../models/travellersignup');
const {TravellingAgency}=require('./../models/travellingagencysignup')
const {PropertyLender} = require('./../models/propertylendersignup');


module.exports=function(app,database)
{

app.post('/travellerlogin',(req,res)=>{
    var body = _.pick(req.body, ['email', 'password']);
    
    Traveller.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
        res.status(200).send({'data':user,'token':token});
      });
    }).catch((e) => {  
      res.status(400).send(e);
    });
})

app.post('/travellingagencylogin',(req,res)=>{
    var body  = _.pick(req.body,['email','password']);
    TravellingAgency.findByCredentials(body.email,body.password).then((user)=>{
       return user.generateAuthToken().then((token)=>{
        res.status(200).send({'data':user,'token':token});
       })
    }).catch((e)=>{
        res.status(400).send(e);
    })  
})

app.post('/propertylenderlogin',(req,res)=>{
    console.log('prop')
    var body  = _.pick(req.body,['email','password']);
    PropertyLender.findByCredentials(body.email,body.password).then((user)=>{
       return user.generateAuthToken().then((token)=>{
           
        res.status(200).send({'data':user,'token':token});
       })
    }).catch((e)=>{
        console.log(e)
        res.status(400).send(e);
    })  
})

}