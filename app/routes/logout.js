const _ = require('lodash');
const {Traveller} = require('./../models/travellersignup');
const {TravellingAgency}=require('./../models/travellingagencysignup')
const {PropertyLender} = require('./../models/propertylendersignup');
const {authenticatetraveller}=require('./../middleware/authenticatetraveller');
const{authenticatepropertylender}=require('./../middleware/authenticatepropertylender');
const {authenticatetravellingagency} =require('./../middleware/authenticatetravellingagency');

module.exports=function(app,database)
{
      app.delete('/travellerslogout',authenticatetraveller,(req,res)=>{
      
           req.traveller.removeToken(req.token).then((success)=>{
          res.status(200).send(success);
        },(e)=>{
          res.status(400).send(e);
        });
      });
     
     app.delete('/travellingagencylogout',authenticatetravellingagency,(req,res)=>{
      
     req.travellingagency.removeToken(req.token).then((success)=>{
       res.status(200).send(success);
     },(e)=>{
       res.status(400).send(e);
     });
   });


   app.delete('/propertylenderlogout',authenticatepropertylender,(req,res)=>{
    
    req.propertylender.removeToken(req.token).then((success)=>{
      res.status(200).send(success);
    },(e)=>{
      res.status(400).send(e);
    });
  });
  
   

}