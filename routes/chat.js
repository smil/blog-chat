var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('chat', {
  	first: true
  });
});



router.post('/', check.notLogin, function(req, res, next) {

	var userName = req.body.userName

	if(!userName){
    req.flash('error', '请输入昵称!');
	  res.redirect('/chat');
  }else{
  	res.render('chat', {
	  	first: false,
	  	userName: userName
	  });
  }
  
});




module.exports = router;
