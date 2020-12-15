const { query } = require('express');
var express = require('express');
const { Query } = require('mongoose');
var router = express.Router();
var user=require('../db/schemas/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',(req,res)=>{
 // console.log(req.body);
  var reg_object=req.body;
  //phone =>schema mobile
  console.log("reached");
  var db=require('../db/dboperations/crud');

  db.Model=require('../db/schemas/user');
 
  db.add(reg_object).then(result=>{
   //   var senmail=require(sendmail);
     //  sendmail(res);
      res.send({message:"registered"});
  }).catch(err=>{
      res.status(404).send({message:"not registered"});
  })

})

router.get('/getUser',(req,res)=>{
  user.find().then(result=>{
    res.status(200).send(result);
  })
})
router.get('/verifyemail/:otp/:_id',(req,res)=>{
    var otp=req.params.otp;
    var _id=req.params._id;
    var db=require('../db/dboperations/crud');
    db.Model=require('../db/schemas/user');
    db.find({otp,_id})
    .then(result=>{
      //database updation
      //redirect
    })
    .ctach(err=>{

    })
});

router.post('/login',(req,res)=>{
  let login_obj=req.body;
  var db=require('../db/dboperations/crud');
  db.Model=require('../db/schemas/user');
  db.find(login_obj).then(result=>{
    
    var gettoken=require('../helpers/gettoken');
    console.log(result);
    gettoken(result[0],res);
    //res.send({message:"logged in",token,_id});
    
  })
  .catch(err=>{
    res.send({message:"not logged in"});
  })
  
})
// router.get('/updatescore/:score/:email',(req,res)=>{
//   //console.log("reache");
//   var db=require('../db/dboperations/crud');
//   db.Model=require("../db/schemas/user");
//   var obj=req.params.email;
//   var object=db.find({email:obj});
//   console.log(object);
//   var scoreparam=req.params.score;
//   console.log(scoreparam);
//    var score=object.score+req.params.score;
//    console.log(score);
//   // var obj=db.find({email:req.params.email}).score+req.params.score;

//   db.update(email,{score:score}).then(result=>{
//     console.log(result);
//   })
//   .catch(err=>{
//     res.send({message:"not updated"});
//   })
// })
router.get('/updatescore/:score/:email',(req,res)=>{
  // var scoreurl=req.url.split("/")[2];
  // var email=req.url.split("/")[3];
  var scoreurl=req.params.score;
  var email=req.params.email;
  var query={email:email};
  console.log(query);
  user.find(query).lean().exec(function(err, result) {
    if (err) throw err;
    console.log(result);
    console.log(result[0].score);
    var scorelast=result[0].score;
    var newScore=scorelast+parseInt(scoreurl);
    var newvalues = { $set: { score: newScore } };
  user.updateOne(query,newvalues,function(err, res) {
    if (err) throw err;
    console.log("Updated");
  });
  })
  
  res.status(200).send({message:"Score get Updated"});
})

router.get('/getrank/:email',(req,res)=>{
  var email=req.url.split("/")[2];
  var query={email:email};
  var db=require('../db/dboperations/crud');

  user.find(query).then(result=>{
    console.log(result[0].rank);
    var promise=result[0].rank;
    res.status(200).send({"rank": promise})
  });
})

router.get('/getrank/:email',(req,res)=>{
  var email=req.url.split("/")[2];
  var query={email:email};

  user.find(query).then(result=>{
    console.log(result[0].rank);
    var promise=result[0].rank;
    res.status(200).send({"rank": promise})
  });
})

router.get('/ranks',(req,res)=>{
  rank.find().sort({rank:1}).then(result=>{
    console.log(result);
    res.status(200).send(result);
  })
})
router.get('/updaterank',(req,res)=>{
  user.find().sort({score:-1}).then(data=>{
    console.log(data)
        for(var i=0;i<data.length;i++){
          data[i].rank=i+1;
          var query = { email: data[i].email };
          var newrank = {$set: {rank: i+1} };
          user.updateOne(query, newrank, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
          });
        }
        res.send({"message":'Rank Updated'})
}).catch(err=>{
     res.send({message:"error"});
})
  })
module.exports = router;
