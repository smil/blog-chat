/*
var mongodb = require('./db');

function Post(name, title, content) {
  this.name = name;
  this.title = title;
  this.content = content;
}


//存储一篇文章及其相关信息
Post.prototype.save = function(callback) {
  var date = new Date();
  //存储各种时间格式，方便以后扩展
  var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth() + 1),
      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  }
  //要存入数据库的文档
  var post = {
      name: this.name,
      time: time.day,
      title: this.title,
      content: this.content
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //将文档插入 posts 集合
      collection.insert(post, {
        safe: true
      }, function (err, post) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err
        }
        callback(null, post[0]);//返回 err 为 null
      });
    });
  });
};

//读取文章及其相关信息
Post.get = function(name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      var query = {};
      if (name) {
        query.name = name;
      }
      //根据 query 对象查询文章
      collection.find(query).sort({
        time: -1
      }).toArray(function (err, resultList) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err
        }
        callback(null, resultList);//成功！以数组形式返回查询的结果
      });
    });
  });
};


//删除文章及其相关信息
Post.delete = function(id, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //删除文章
      collection.remove({postId: id}, 'posts', function (err, result) {
        mongodb.close();
        if(err){
          return callback(err);
        }
        callback(null, result);//成功！返回删除数据的数量
      });
    });
  });
};

module.exports = Post;

  */

var Post = require('../models/mongo').Post;

module.exports = {
  // // 创建一篇文章
  // create: function (post) {
  //   return Post.create(post).exec()
  // },
  //
  // // 通过文章作者名获取
  // getPostByName: function (name) {
  //   var query = {};
  //   if (name) {
  //     query.author = name;
  //   }
  //   return Post
  //     .find(query).exec()
  // },
  //
  //
  // // 通过文章 id 和 author 获取一篇文章
  // getPostByIdAndName: function (postId, name) {
  //   return Post.find({ id: parseInt(postId), author: name }).exec()
  // },
  //
  // // 通过文章 id, author 更新一篇文章
  // updatePostById: function (postId, name, data) {
  //   return Post.update({ id: parseInt(postId), author: name }, { $set: data }).exec();
  // },
  //
  // //删除文章
  // deleteByIdAndName: function (postId, name) {
  //   return Post.remove({ id: parseInt(postId),  author: name }).exec()
  // },



  //method：增删改查，params：条件， updateData： 更新内容
  queryPost: function (method, params, updateData) {
    if(!updateData){
      return Post[method](params).exec();
    }else{
      return Post[method](params, {$set: updateData}).exec();
    }

  }




}