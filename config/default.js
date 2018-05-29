module.exports = {
  port: 27017,
  session: {
    secret: 'myDataBase',
    key: 'myDataBase',
    maxAge: 1000 * 60 * 60 * 24 * 30
  },
  mongodb: 'mongodb://localhost:27017/myDataBase'
}
