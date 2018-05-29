var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');
var check = require('../public/js/check.js');


/* GET users listing. */
router.get('/', check.isLogin, function(req, res, next) {
  res.render('login');

});
router.post('/', function (req, res, next) {
  var name = req.body.name,
    password = req.body.password;

  if(!name || !password){
    req.flash('error', '请输入完整信息!');
    return res.redirect('/login');//返回登录页
  }

  if(!(/^[A-Za-z0-9]{5,}$/).test(password)){
    req.flash('error', '密码格式不正确!');
    return res.redirect('/login');//返回登录页
  }

  UserModel.getUserByName(name)
    .then(function (user) {
      if (!user) {
        req.flash('error', '用户不存在');
        return res.redirect('/login');
      }
      // 检查密码是否匹配
      if (password !== user.password) {
        req.flash('error', '用户名或密码错误');
        return res.redirect('/login');
      }
      req.flash('success', '登录成功');

      // 用户信息写入 session
      delete user.password;
      req.session.user = user;
      // 跳转到主页
      res.redirect('/');
    })
    .catch(next)

});

module.exports = router;
