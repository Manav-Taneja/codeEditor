module.exports=(object_login,token,res)=>{
        var db=require('../db/dboperations/crud');
        db.Model=require('../db/schemas/user');
        db.updateDoc(object_login,{token:token})
        .then(result=>{
            res.send({token:token,_id:object_login._id});
        })
        .catch(err=>{
            res.send({message:"error3"});
        })
}