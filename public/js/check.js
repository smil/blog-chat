
/*
    用户手动访问页面:(权限控制)
    注册页, 登录页: 有session.user时,返回现在页面
    发布页, 退出登录页面， 详情页: 没有session.user时,返回登录页
 */
function notLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '未登录!请先登录');
    res.redirect('/login');
  }
  next();
}

function isLogin(req, res, next) {
  if (req.session.user) {
    req.flash('error', '已登录!');
    res.redirect('back');
  }
  next();
}

module.exports = {
  notLogin: notLogin,
  isLogin: isLogin
}


