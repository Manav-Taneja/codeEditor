var axios=require('axios');
module.exports=(object_login,res)=>{
    
    axios.get(`http://localhost:4001/generateToken?email=${object_login.email}`)
    .then(result=>{
     // console.log("token:: ",result2);
      console.log("tokken: ",result)
      //res.send({token:result.data,_id:object_login._id});//_id we are going to use as userid
        var updatetoken=require('./updatetoken');
        updatetoken(object_login,result.data,res);

    })
    .catch(error=>{
      console.log(error);
      res.send({message:"error2"});
    })
}