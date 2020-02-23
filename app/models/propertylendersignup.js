const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');



var PropertyLenderSchema = new mongoose.Schema({

    name:[{
        firstname:{
          type:String,
       //   required:true
        },lastname:{
          type:String,
       //   required:true
        }
      }],
      password: {
        type: String,
        require: true,
        minlength: 6
      },
      nic:{
        type:String
  
    
      },
      mobilenumber:{
        type:Number,
      //  required:true,
      //  maxlength:11,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
          validator: validator.isEmail,
          message: '{VALUE} is not a valid email'
        }
      }, 
      address:[{
        zipcode:{
          type:Number,
      //    required:true
        },
        city:{
          type:String,
       //   required:true
        },
        province:{
          type:String,
        //  required:true
        },
        addressline:{
          type:String,
        //  required:true
        },
                
      }],
      propertytype:{
        type:String,
      },
      country:{
        type:String,
      //  required:true
      },
      // imagesurl:[{
      //     url:{type:String}
         
      // }],
      tokens: [{
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        }
      }],
      verified:{
        type:Boolean,
        default: false
      }



});


PropertyLenderSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email','name','imagesurl','address','propertytype']);
};

PropertyLenderSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

PropertyLenderSchema.statics.findByToken = function (token) {
  var user = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return user.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

PropertyLenderSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

PropertyLenderSchema.statics.findByCredentials = function(email,password){
    var user = this;
     return user.findOne({email}).then((user)=>{
      if(!user){
        return Promise.reject();
      }
      return new Promise((resolve,reject)=>{
         bcrypt.compare(password,user.password,(err,res)=>{
           if(res)
           {
             resolve(user);
           }
           else{
            reject();
           }
         })
      })
    })
}

PropertyLenderSchema.methods.removeToken=function(token){
    var user = this;
    return user.update({
      $pull:{
        tokens:{token}
      }
      
    });
}





var PropertyLender = mongoose.model('PropertyLender', PropertyLenderSchema);

module.exports = {PropertyLender}