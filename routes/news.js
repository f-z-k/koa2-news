const router = require('koa-router')()
const news = require('./../controller/newsController.js')
router.prefix('/news')
router.get('/list', news.lists)
router.get('/add', news.addNews)
module.exports = router
