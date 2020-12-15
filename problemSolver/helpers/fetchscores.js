module.exports=(score)=>{
    var axios=require('axios');
    axios.get(`http://localhost:4003/getTestcases?pid=${pid}`)
    .then(result=>{
        var score=result;
        console.log(score);
    }).catch(err=>{
         res.send({message:"error"});
    })
 
 }
 
 