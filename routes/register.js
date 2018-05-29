var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');
var check = require('../public/js/check.js');


/* GET users listing. */
router.get('/', check.isLogin, function(req, res, next) {
  res.render('register');
});

router.post('/', function (req, res) {
  var name = req.body.name,
    password = req.body.password1,
    password_re = req.body.password2,
    email = req.body.email;


  //检验用户两次输入的密码是否一致
  if (password_re != password) {
    req.flash('error', '两次输入的密码不一致!');
    return res.redirect('/register');
  }

  if(!name || !password || !password_re){
    req.flash('error', '请输入完整信息!');
    return res.redirect('/register');
  }


  // 用户信息写入数据库
  UserModel.create({
      name: name,
      password: password,
      email: email
  }).then(function (result) {
    // 此 user 是插入 mongodb 后的值，包含 _id
    user = result.ops[0];
    // 删除密码这种敏感信息，将用户信息存入 session
    delete user.password;
    req.session.user = user;
    // 写入 flash
    req.flash('success', '注册成功')
    // 跳转到首页
    res.redirect('/')
  }).catch(function (e) {
    // 用户名被占用则跳回注册页，而不是错误页
    if (e.message.match('duplicate key')) {
      req.flash('error', '用户名已被占用');
      return res.redirect('/register')
    }
    next(e)
  })

});

module.exports = router;
