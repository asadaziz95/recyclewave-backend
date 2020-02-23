const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var CreatetourSchema = new mongoose.Schema({
  travellingagencyid:{
    type:String
  },
  name:{
    type: String
  },
  price:{
    type:String
  },
  numberofdays:{
    type:String
  },
  numberofnights:{
    type:String
  },
  tourdetails:{
    type: String
  },
  departurelocation :{
    type: String
  },
  returnlocation:{
    type:String
  },
  departuretime :{
    type: String
  },
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
  bookingquery:[{
    travellerid:{
      type: String
    },
    name: {
      type: String
    },
    numberofadults:{
      type:Number
    },
    numberofkids:{
      type:Number
    },
    phonenumber:{
      type:Number
    },
    message:{
      type:String
    },
    travelleremail: {
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
    }
  }]
});











var Createtour = mongoose.model('Createtour', CreatetourSchema);

module.exports = {Createtour}
