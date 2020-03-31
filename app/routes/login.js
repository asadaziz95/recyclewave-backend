const _ = require('lodash');
const {User} = require('./../models/User');


module.exports=function(app,database)
{

app.post('/login',(req,res)=>{
    var body = _.pick(req.body, ['email', 'password']);
    console.log("user body",body)
    
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
        res.status(200).send({'data':user,'token':token});
      });
    }).catch((e) => {  
      res.status(400).send("Email or password is wrong!");
    });
})


}