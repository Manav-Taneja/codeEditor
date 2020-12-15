// const {exec} =require('child_process');
// const fs=require('fs');

// module.exports=(code,userid,pid,language,testcases,res)=>{
//     var directory= userid;
//     var result="";

//     if(!fs.existsSync(directory)){
//         fs.mkdirSync(directory)
//     }

//     fs.writeFileSync(`${directory}/Test.java`,code, function(err){
//         if(err)
//         return;
//         else{
//             console.lof("file created");
//         }
//     });
// //jdk should be installed and configured
// //process execute command ==>dos /command prompt  console output =>that will be displayed

// exec(`javac ${directory}/Test.java`,(error,stdout,stderr)=>{
//     if(error|| stderr){
//         result="compilation error"
//         res.send(result);
        
//     }
//     else{//class file
//         result="compilation successful and no output";

//         exec(`cd ${directory} && java Test`,(error2,stdout2,stderr2)=>{
//             if(error2||stderr2){
//                 result="execution failure"
//                 return;
//             }
//             else{
//                 result="successful execution";
//                 console.log(stdout2);
//                 res.send(result);
//             }
//         })
//     }
// })


// }


const {exec} =require('child_process');
const fs=require('fs');
var axios=require('axios');
const util=require('util');
const execAsync = util.promisify(require("child_process").exec);
module.exports=(code,userid,pid,language,testcases,res)=>{
    //code=String replace function =>System.in =array args
    var directory= userid;
    var result="";
    var temp=0;
    if(!fs.existsSync(directory)){
        fs.mkdirSync(directory)
    }
    
    fs.writeFileSync(`${directory}/Test.java`,code, function(err){
        if(err){
            console.log("error inside fs function")
        return;
        }
        else{
            console.log("file created");
        }
    });

exec(`javac ${directory}/Test.java`,(error,value)=>{
    if(error){
        result="compilation error"
        return res.status(200).send({"message" : "compile time error"});
        
    }
    else{
        var arr=[];
        result="compilation successful and no output";
            for(var i = 0; i< testcases.data.length; i++){
                let output = testcases.data[i].output;
                execAsync(`cd ${directory} && java Test ${testcases.data[i].input}`,function(error, value){
                    temp++;
                    arr[temp-1]=0;
                    console.log(temp-1+" i value");
                    value=value.trim();
                 if(error){
                     console.log(error);
                    // return res.status(404).json(error);
                 }
                else if(String(value).localeCompare(String(output))!== 0){
                     console.log(output+" this is output");
                     console.log(value+" this is value");
                     console.log(arr[temp-1]);
                    //  return res.status(405).json({"value":value,message:"hello"}); 
                 }
                 else{
                     arr[temp-1]=1
                 }
                console.log(temp+"temp");
                console.log(arr);
                if(arr.length===testcases.data.length){
                    var j=0;
                    for( j=0;j<arr.length;j++){
                        console.log(arr[j]+"inside if")
                        if(arr[j]===0){
                            break;
                        }
                    }
                    console.log(j+"j value");
                    if(j==arr.length){
                        axios.get(`http://localhost:4002/getscore/${pid}`)
              .then(result=>{
                  console.log(result);
           var score=result.data.result;
        axios.get(`http://localhost:4000/updatescore/${score}/${userid}`)
           .then(finalresult=>{
            axios.get(`http://localhost:4000/updaterank`).then(newrank=>{
                 return res.status(200).send("Successfull Exceution !! Yay !!")
                }).catch(err=>{
                    console.log("erro"+err);
                });
               }).catch(err=>{
                console.log("erro"+err);
            });
            }).catch(err=>{
                console.log("erro"+err);
            });
        }
        else{
            return res.status(200).send("There is an error");
        }
                    }
            })
}
        }
    
})
}