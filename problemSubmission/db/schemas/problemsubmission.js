const connection=require('../conf/dburl');
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const problemsubmission = new schema({
  
  code:{type:String},
  pid:{type:schema.Types.ObjectId},
  result:{type:String},
  userid:{type:schema.Types.ObjectId},
  dateTime:{type:Date},
  attempts:Number,
  language:String
    
});

  const Model = connection.model('problemsubmission', problemsubmission);
  Model.createCollection().then(function(collection) {
    console.log(' problemsubmission Collection is created!');
  });

  module.exports=Model;