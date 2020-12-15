var express = require('express');
const sendtosolver = require('../helpers/sendtosolver');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submitcode',(req,res)=>{
  var submission_obj=req.body;
  var date=new Date();
  var objectsubmissiondate={...submission_obj,dateTime:date};
  var db=require('../db/dboperations/crud');
  db.Model=require('../db/schemas/problemsubmission');
  db.add(objectsubmissiondate).then(result=>{
      var solver=require('../helpers/sendtosolver');
      solver(submission_obj,res);
  }).catch(err=>{
    res.json({message:"error"});
  })
})

module.exports = router;
