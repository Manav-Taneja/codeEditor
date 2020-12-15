var axios=require('axios');
module.exports=(submission_obj,res)=>{
    axios.post('http://localhost:4005/solve',submission_obj)
    .then(result=>{
        console.log("out put from solver",result.data);
        //success then 
        var updateresult=require('../helpers/updateresult');
        updateresult(submission_obj,result.data,res);
    })
    .catch(err=>{
        res.json({message:'error'});
    });
}