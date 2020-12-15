const connection=require('../conf/dburl');
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const scoreinfo = new schema({
  
  level:String,
  score:Number
    
});

  const Model = connection.model('scoreinfo', scoreinfo);
  Model.createCollection().then(function(collection) {
    console.log(' scoreinfo Collection is created!');
  });

  module.exports=Model;