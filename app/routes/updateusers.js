const _ = require('lodash');
const {Traveller} = require('./../models/travellersignup');
const {TravellingAgency}=require('./../models/travellingagencysignup')
const {PropertyLender} = require('./../models/propertylendersignup');
const multer = require('multer');
var cloudinary = require('cloudinary');
const upload = multer({
    dest: 'uploads/'
});


module.exports=function(app,database)
{


    app.post('/updatetraveller', upload.any(), (req, res) => 
    { 
      var body = _.pick(req.body,['travellerid','name','nic','mobilenumber','travellertoken']);
      console.log("While updateing traveller");
      console.log(req.files)
      Traveller.findByToken(body.travellertoken).then((user) => {
        if(user.tokens[0].token)
        {
          Traveller.update({_id:body.travellerid},{"name":body.name,"nic":body.nic,"mobilenumber":body.mobilenumber}).then((updatedUser) => {
            console.log(updatedUser);
           res.send(updatedUser);
        }).catch((e) => {  
          res.status(400).send("User Does Not Exist");
        });
 
        }
        
    }).catch((e) => {  
      res.status(400).send("User Does Not Exist");
    });
    });

    app.post('/updatetravellingagency', (req, res) => 
    { 
      
      var body = _.pick(req.body,['id','travellingagencyname','nic','contactnumber','token','travellingagencyregistrationnumber','address']);
      TravellingAgency.findByToken(body.token).then((user) => {
        {
     
          if(user.tokens[0].token)
          {
          TravellingAgency.update({_id:body.id},{"name":body.name,"nic":body.nic,"contactnumber":body.contactnumber,"registrationnumber":body.registrationnumber,"address":body.address}).then((updatedUser) => {
            console.log(updatedUser);
           res.send(updatedUser);
           console.log(e);
        }).catch((e) => {  
          res.status(400).send("User Does Not Exist update");
        });
 
        }
      }
    }).catch((e) => {  
      res.status(400).send("User Does Not Exist find by token");
    });
    });
    
    app.post('/updatepropertylender', (req, res) => 
    { 
  
      var body = _.pick(req.body,['id','token','name','nic','contactnumber','address','propertytype']);
      console.log("body");
      console.log(body);
      PropertyLender.findByToken(body.token).then((user) => {
        {
          if(user.tokens[0].token)
          {
          PropertyLender.update({_id:body.id},{"name":body.name,"nic":body.nic,"contactnumber.mobilenumber":body.contactnumber.mobilenumber,"contactnumber.landline":body.contactnumber.landline,"address":body.address,"propertytype":body.propertytype}).then((updatedUser) => {
            console.log(updatedUser);
           res.send(updatedUser);
        }).catch((e) => {  
          res.status(400).send("User Does Not Exist from update");
        });
 
        }
      }
    }).catch((e) => {  
      res.status(400).send("User Does Not Exist bahri say");
    });
    });
}