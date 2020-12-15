const connection=require('../conf/dburl');
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const user = new schema({
  
  // title:{type:String},
  // levelid:{type:schema.Types.ObjectId},
  // question:{type:String},
  // companies: [{ type: String}]
  password:String,
  email:String,
  phone:String,
  token:{type:String,default:""},
  lastaccesstime:Date,
  rank:Number,
  score:Number,
  verified:{type:String,default:'Y'},//Y=>yes N=>no
  otp:String,
  otptime:Date
    
});

  const Model = connection.model('user', user);
  Model.createCollection().then(function(collection) {
    console.log('user Collection is created!');
  });

  module.exports=Model;
