const mongoose = require('mongoose');
const validator = require('validator');



var CreateOrderSchema = new mongoose.Schema({
  userId:{
    type:String
  },
  assigneeId:{
    type:String
  },
  name:{
    type: String
  },
  type:{
    type:String
  },
  amount:{
    type:String
  },
  address:{
    type:String
  },
  mobileno:{
    type:String
  },
  status:{
    type:String
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
});











var Createorder = mongoose.model('Createorder', CreateOrderSchema);

module.exports = {Createorder}
