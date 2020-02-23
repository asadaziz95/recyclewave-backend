const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var volunteerSchema = new mongoose.Schema({
  travellingagencyid:{
    type:String
  },
  name:{
    type: String
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
  }

});











var volunteer = mongoose.model('volunteer', volunteerSchema);

module.exports = {volunteer}
