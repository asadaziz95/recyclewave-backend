const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var TravellerSchema = new mongoose.Schema({
  name:[{
    firstname:{
      type:String
     // required:true
    },lastname:{
      type:String
     // required:true
    }
  }],
  email: {

    type: String,
    required: true,
    trim: true,
    minlength: 1,
    required: true, 
    index:true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  nic:{
    type:String,
   

  },
  mobilenumber:{
    type:String,
    // required:true,

  },

  profilepicture:{
    type:String
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});





TravellerSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email','name','profilepicture','nic','mobilenumber','token']);
};

TravellerSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

TravellerSchema.statics.findByToken = function (token) {
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

TravellerSchema.pre('save', function (next) {
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


TravellerSchema.statics.findByCredentials = function (email, password) {
  var User = this;
  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
   
      bcrypt.compare(password, user.password).then((res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
    });
    });
  });
};

TravellerSchema.methods.removeToken=function(token){
    var user = this;
    return user.update({
      $pull:{
        tokens:{token}
      }
      
    });
}



var Traveller = mongoose.model('Traveller', TravellerSchema);

module.exports = {Traveller}
