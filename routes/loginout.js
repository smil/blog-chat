var express = require('express');
var router = express.Router();
var check = require('../public/js/check.js');


/* GET users listing. */
router.get('/', check.notLogin, function(req, res, next) {
  //清除用户信息
  req.session.user = null;
  req.flash('success', '登出成功!');
  res.redirect('/');//登出成功后跳转到主页
});

module.exports = router;