var express = require('express');
const { db } = require('../db/conf/dburl');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/inserttestcases',(req,res)=>{
    var object_testcases=req.body;
    var db=require('../db/dboperations/crud');
    db.Model=require('../db/schemas/testcases');
    db.add(object_testcases).then(result=>{
        res.send("added")
    })
    .catch(err=>{
      res.send({message:"error"});
    })
});

router.get('/getTestcases',(req,res)=>{
  var pid=req.query.pid;
  var db=require('../db/dboperations/crud');
  db.Model=require('../db/schemas/testcases');
  db.find({pid:pid}).then(result=>{
    console.log(result);
    res.send(result);
  }).catch(err=>{
    res.send({message:"error"});
  });
})


module.exports = router;
