//const dburl="mongodb://127.0.0.1:27017/classmarker";
//const dburl="mongodb+srv://kajal:kajal@123@cluster0.azrlp.mongodb.net/onlineeditor?retryWrites=true&w=majority";
const dburl="mongodb://localhost:27017/OnlineCodeEditor";
const mongoose=require('mongoose');
const action={
  useNewUrlParser: true
}
 mongoose.connect(dburl,action);

module.exports=mongoose.connection;