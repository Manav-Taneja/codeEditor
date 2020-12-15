var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/generateToken',(req,res)=>{
  var email=req.query.email;
  if(email!==null){
    var jwt=require('../utils/jwt');
    var token=jwt.generatetoken(email);
    console.log(token);
    res.send(token);
  }
})
module.exports = router;
