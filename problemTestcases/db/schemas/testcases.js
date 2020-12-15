const connection=require('../conf/dburl');
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const testcases = new schema({

  pid:{type:schema.Types.ObjectId},
  input:{type:String},
  output: { type: String},
  status:{type:String,default:true}//true=>showing false=>not using the testcase
});

  const Model = connection.model('testcases', testcases);
  Model.createCollection().then(function(collection) {
    console.log(' testcases Collection is created!');
  });

  module.exports=Model;