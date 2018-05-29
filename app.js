var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// var settings = require('./setting');
var config = require('config-lite')(__dirname);
var flash = require('connect-flash');
//session middleware
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// app.use(session({
//   secret: settings.cookieSecret,
//   key: settings.db,//cookie name
//   cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},
//   store: new MongoStore({
//     // db: settings.db,
//     url: 'mongodb://localhost/'+ settings.db,
//     autoRemove: 'native'
//   })
// }));


app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.engine('html', require('ejs').__express);
// app.set('view engine', 'html');
app.use(flash());


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// import routers
require('./routes/router')(app);

module.exports = app;
