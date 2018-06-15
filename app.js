const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const cors = require('koa2-cors');
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('koa-jwt')
const index = require('./routes/index')
const users = require('./routes/users')
const news =  require('./routes/news')
const ueditor =  require('./routes/ueditor')
// error handler
onerror(app)
app.use(cors())
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(function(ctx, next){
//   return next().catch((err) => {
//     if (401 == err.status) {
//       ctx.status = 401;
//       ctx.body = 'Protected resource, use Authorization header to get access\n';
//     } else {
//       throw err;
//     }
//   });
// });
// app.use(jwt({ secret: 'fzk' }).unless({ path: [/^\/users/] }))
// app.use(function(ctx, next){
//   if (ctx.url.match(/^\/users/)) {
//     console.log('不被保护')
//     let token = ctx.header.authorization  // 获取jwt
//     console.log(token)
//     return next();
//   } else {
//     return next();
//   }
// });
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(news.routes(), news.allowedMethods())
app.use(ueditor.routes(), ueditor.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
