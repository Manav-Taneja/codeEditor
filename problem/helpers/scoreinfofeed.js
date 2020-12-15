const scorefeed=()=>{
    var db=require('../db/dboperations/crud');
    db.Model=require('../db/schemas/scoreinfo');
    var object=[{level:"easy",score:5},
                {level:"medium",score:7},
                {level:"hard",score:10}]

    db.add(object)
    .then(result=>{
        console.log(result);
    })
    .catch(error=>{
        console.log(error);
    })
}


scorefeed();