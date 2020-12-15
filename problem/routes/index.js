var express = require('express');
var router = express.Router();
var scoreinfo=require('../db/schemas/scoreinfo');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/insertproblem',(req,res)=>{
  var object_problem=req.body;
  console.log("Reached insert");
  var db=require('../db/dboperations/crud');
  db.Model=require('../db/schemas/problem');
  db.add(object_problem).then(result=>{
    res.send({message:'added'})
  }).catch(err=>{
    res.send({message:"error"});
  })
})

router.get('/getallproblem',(req,res)=>{
  var db=require('../db/dboperations/crud');
  db.Model=require('../db/schemas/problem');
  db.find({}).then(result=>{
    res.send(result);
  }).catch(err=>{
    res.send({message:"error"});
  })
})

router.get('/getproblem',(req,res)=>{
  var pid=req.query.pid;
  var db=require('../db/dboperations/crud');
  db.Model=require('../db/schemas/problem');
  db.find({_id:pid}).then(result=>{
    console.log(result);
    res.send(result);
  }).catch(err=>{
    res.send({message:"error"});
  })
})

router.get('/getscore/:pid',  (req,res)=>{
  var pid=req.url.split("/")[2];
  var db=require('../db/dboperations/crud');
  db.Model=require('../db/schemas/problem');
  db.find({_id:pid}).then(result=>{
      var level=result[0].level;
      console.log(level);
      findScore(level,function(score){
        res.status(200).send({"result":score})
      });
      // var score=
      // console.log(score[0].score);
      // console.log("hello");
      // res.send(score[0].score);
  });
});
function findScore(level,cb){
  scoreinfo.findOne({level:level}, function(err, result) {
      if (err) throw err;
      console.log(result);
      var scorefinal= result.score;
      console.log(scorefinal);
      cb(scorefinal);
  });
}
module.exports = router;
