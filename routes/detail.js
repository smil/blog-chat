var express = require('express');
var router = express.Router();
const PostModel = require('../models/post');

//验证 :id 的 route middleware
router.param('id', function(req, res, next, id) {
  console.log('this id is' + id);
  next();
});


router.get('/', function(req, res, next) {
  res.render('detail');
});


router.get('/:id', function(req, res, next) {
  var postId = req.params.id, user = req.session.user;
  if(!user){
    req.flash('error', '请先登录');
    return res.redirect('/');
  }
  PostModel.queryPost('find', {id: parseInt(postId), author: user.name})
      .then(function (data) {
          if(!data.length){
              req.flash('error', '没有相关数据!');
              return res.redirect('back');
          }else{
              res.render('detail', {
                  detail : data[0]
              })
          }

      })
      .catch(next);
});

module.exports = router;
