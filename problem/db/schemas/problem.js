const connection=require('../conf/dburl');
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const problem = new schema({
  
  title:{type:String},
 // levelid:{type:schema.Types.ObjectId},
  level:{type:String},
  question:{type:String},
  companies: [{ type: String}]
    
});
  const Model = connection.model('problem', problem);
  Model.createCollection().then(function(collection) {
    console.log(' problem Collection is created!');
  });
  module.exports=Model;