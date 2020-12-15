var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/solve',(req,res)=>{
var code =req.body.code;
var userid=req.body.userid;
var pid=req.body.pid;
var language=req.body.language;
var testcases=require('../helpers/fetchtestcases');
testcases(code, userid,pid,language,res);

});

module.exports = router;
