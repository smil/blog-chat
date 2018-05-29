var express = require('express');
var router = express.Router();
var PostModel = require('../models/post');
var check = require('../public/js/check.js');


/* GET users listing. */
router.get('/', check.notLogin, function(req, res, next) {
  res.render('post');
});

router.post('/', function (req, res, next) {
  var title = req.body.title,
    content = req.body.content,
    author = req.session.user.name;

  var date = new Date();
  var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  if(!title || !content){
    req.flash('error', "请输入完整信息");
    return res.redirect('/post');
  }

  var post = {
    author: author,
    title: title,
    content: content,
    time: time
  };
  PostModel.queryPost('find', {author: author})
      .then(function (result) {
          post.id = result.length ? ++result[result.length - 1].id : 0;
          return post;
      }).then(function (post) {
          PostModel.queryPost('create', post)
              .then(function () {
                  req.flash('success', '发表成功');
                  res.redirect('/');
              })
      })
      .catch(next);
});


//删除
router.get('/delete/:id', function (req, res, next) {
    var postId = req.params.id, name = req.session.user.name;
    PostModel.queryPost('remove', {id: parseInt(postId), author: name})
        .then(function () {
            req.flash('success', '删除文章成功');
            res.redirect('/');
        })
        .catch(next);
});



//编辑
router.get('/edit/:id', function (req, res, next) {
  var postId = req.params.id, name = req.session.user.name;
  PostModel.queryPost('find', {id: parseInt(postId), author: name})
      .then(function (data) {
          res.render('post', {
            detail : data[0]
          });
      })
      .catch(next)

});

router.post('/edit/:id', function (req, res, next) {
  var postId = req.params.id, name = req.session.user.name;
  var data = {
    title : req.body.title,
    content : req.body.content
  };
  if(!req.body.title || !req.body.content){
      req.flash('error', "请输入完整信息");
      return res.redirect('/post/edit/' + postId);
  }

  PostModel.queryPost('update', {id: parseInt(postId), author: name}, data)
      .then(function () {
          req.flash('success', "更新文章成功");
          return res.redirect('/');
      })
});

module.exports = router;