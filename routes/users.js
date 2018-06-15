const router = require('koa-router')()
const user = require('./../controller/userController.js')
router.prefix('/users')
router.post('/login', user.login)
router.post('/registered', user.registered)
router.get('/list', user.find)
module.exports = router
