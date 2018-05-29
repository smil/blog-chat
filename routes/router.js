// req.query： 处理 get 请求，获取 get 请求参数
// req.params： 处理 /:xxx 形式的 get 或 post 请求，获取请求参数
// req.body： 处理 post 请求，获取 post 请求体
// req.param()： 处理 get 和 post 请求，但查找优先级由高到低为 req.params→req.body→req.query
module.exports = function (app) {

  // 添加模板必需的三个变量
  app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString() ;
    res.locals.error = req.flash('error').toString();
    next()
  });

  app.use('/', require('./index'));
  app.use('/register', require('./register'));
  app.use('/login', require('./login'));
  app.use('/post', require('./post'));
  app.use('/loginOut', require('./loginOut'));
  app.use('/detail', require('./detail'));
  app.use('/chat', require('./chat'));

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

};
