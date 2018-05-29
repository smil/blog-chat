const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect(config.mongodb);



exports.User = mongolass.model('User', {
  name: { type: 'string' },
  password: { type: 'string' },
  email: { type: 'string' }
});
exports.User.index({ name: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一



exports.Post = mongolass.model('Post', {
  author: { type: 'string' },
  title: { type: 'string' },
  content: { type: 'string' },
  id: { type: 'number' },
  time: {type: 'string'}
});
exports.Post.index({ id: 1, _id: -1 }, { unique: true }).exec();// 按创建时间降序查看用户的文章列表