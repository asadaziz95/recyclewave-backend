const _ = require('lodash');
const {authenticateUser}=require('./../middleware/authenticateUser');


module.exports=function(app,database)
{
      app.delete('/logout',authenticateUser,(req,res)=>{
        console.log("in logout")
           req.user.removeToken(req.token).then((success)=>{
          res.status(200).send(success);
        },(e)=>{
          res.status(400).send(e);
        });
      })
}