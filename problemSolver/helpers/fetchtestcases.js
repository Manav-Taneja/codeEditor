module.exports=(code, userid,pid,language,res)=>{
   var axios=require('axios');
   axios.get(`http://localhost:4003/getTestcases?pid=${pid}`)
   .then(result=>{
       var testcases=result;
       console.log(result);
    var executor=require('../helpers/executor');
     executor(code,userid,pid,language,testcases,res);
   }).catch(err=>{
      console.log(err);
        res.send({message:"error"});
   })

}

