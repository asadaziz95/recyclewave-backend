const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');



var TravellingAgencySchema = new mongoose.Schema({
    name:{
      type:String
    //  required:true
    },
    logourl:{
      type:String
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
    password: {
      type: String,
      require: true
  
    },
    contactnumber:[{
      mobilenumber:{
        type:Number,
    //    required:true,
    //    maxlength:11,
      },
      landlinenumber:{
        type:Number,
    //    required:true,
      //  maxlength:11,
      }
    
    }],
    registrationnumber:{
      type:String,
  //    required:true,
    },
    address:[{
      zipcode:{
        type:Number,
      //  required:true
      },
      city:{
        type:String,
      //  required:true
      },
      province:{
        type:String,
     //   required:true
      },
      agencyaddressline1:{
        type:String,
     //   required:true
      },
      agencyaddressline2:{
        type:String,
     //   required:true
      },
      country:{
        type:String,
      //  required:true
      }
    }],
    // packages:[{
    //   url:{type:String}
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
  })


  TravellingAgencySchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
  
    return _.pick(userObject, ['_id', 'email','name']);
  };
  
  TravellingAgencySchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  
    user.tokens.push({access, token});
  
    return user.save().then(() => {
      return token;
    });
  };
  
  TravellingAgencySchema.statics.findByToken = function (token) {
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
  
  TravellingAgencySchema.pre('save', function (next) {
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
  
  TravellingAgencySchema.statics.findByCredentials = function(email,password){
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
  
  TravellingAgencySchema.methods.removeToken=function(token){
      var user = this;
      return user.update({
        $pull:{
          tokens:{token}
        }
        
      });
  }


  var TravellingAgency = mongoose.model('TravellingAgency',TravellingAgencySchema)

  module.exports = {TravellingAgency}