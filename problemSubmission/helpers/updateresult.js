module.exports=(submission_obj,result,res)=>{
    var db =require('../db/dboperations/crud');
    db.Model=require('../db/schemas/problemsubmission');
    db.updateDoc({userid:submission_obj.userid,pid:submission_obj.pid},{result:result}).then(result1=>{
        res.json({result});
    }).catch(err=>{
        res.json({message:"error"})
    })

}