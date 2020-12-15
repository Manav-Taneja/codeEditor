//var passwordHash = require('password-hash');

Operation={
    Model   :' ',
    add :function(userObject){
            console.log(userObject);
            
                var promise=new Promise((resolve,reject)=>{
                    this.Model.create(userObject,(err)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve("added");
                        }
                });
                
            });
            return promise;
    },
    updateDoc:function(conditions,Object){
         var conditionObject = conditions;
         var update = { $set: Object};
         var options = {  };
console.log(conditions,Object);
     var promise=new Promise((resolve,reject)=>{

            this.Model.updateOne(conditionObject, update, options, (err, numobj)=>{
                if(err)
                { 
                        console.log(err);
                        reject(err);
                }
                else{
                        console.log("successfully completed",numobj.n);
                        resolve(numobj.n);
                }
            });
     });  
     return promise;   
 },
    
    find:function(obj){
        console.log("find:",obj);
        var promise= this.Model.find(obj);
       return promise;
     },
    
    delete:function(obj){
       // var promise=this.Model.deleteOne(obj);
       var promise=new Promise((resolve,reject)=>{
         this.Model.remove(obj,(err)=>{
            if(err)
            reject(err);
            else
            resolve("deleted");
                });
        });
       return promise;
    },
    sort:function(){
       return this.Model.aggregate([
            {sort:{"_id":1}},
            {
                $graphLookup:{
                    //different microservices (databases never apply join)
                    from:"schema ",
                    starts
                }
            }
        ])
    }
    //aggregate function 
};

module.exports=Operation;
