var express = require('express');
var router = express.Router();
// var Post = require('../models/post.js');
const PostModel = require('../models/post');

/* GET users listing. */
router.get('/', function(req, res, next) {

  var user = req.session.user, queryName, params = {};
  queryName = user ? user.name : null;

  if (queryName) {
      params.author = queryName;
  }

  PostModel.queryPost('find', params)
      .then(function (data) {
          console.log(data);
          res.render('index', {
              resultList: data
          });
      });
});


module.exports = router;
