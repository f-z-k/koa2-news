const User = require('./../model/user.js');
const crypto = require('crypto');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const find = async (ctx) => {
  let userLists = await User.find({}).exec();
  ctx.body = {
    userLists,
    success: true
  }
}
const login = async (ctx) => {
  let userName = ctx.request.body.name;
  let userPwd = ctx.request.body.password;
  if (!userName || !userPwd) {
    ctx.body = {
      msg: '用户名或密码格式有误',
      code: 100002,
      success: false
    }
    return
  }
  let user = await User.findOne({user_name: userName});
  if (user) {
    if (user.user_pwd === userPwd) {
      let newToken = jwt.sign({ user_name: 'userName' }, 'fanzhongkui');
      let updateUser = await User.findByIdAndUpdate(user._id, {access_token: newToken}, {new: true})
      ctx.body = {
        token: updateUser.access_token,
        success: true
      }
    } else {
      ctx.body = {
        msg: '密码错误',
        code: 100002,
        success: false
      }
    }
  } else {
    ctx.body = {
      msg: '没有此用户',
      code: 100001,
      success: false
    }
  }
}
const registered = async (ctx) => {
  let userName = ctx.request.body.name;
  let userPwd = ctx.request.body.password;
  if (!userName || !userPwd) {
    ctx.body = {
      msg: '用户名或密码格式有误',
      code: 100002,
      success: false
    }
    return
  }
  let isRegister = await User.findOne({user_name: userName});
  if (isRegister) {
    ctx.body = {
      msg: '用户已存在',
      code: 100001,
      success: false
    }
  } else {
    let userInfo = {
      user_name: userName,
      user_pwd: crypto.createHash('md5').update(userPwd).digest('hex'),
      access_token: jwt.sign({ user_name: 'userName' }, 'fanzhongkui')
    }
    try {
      let addInfo = await User.create(userInfo)
      ctx.body = {
        userInfo: addInfo,
        success: true
      }
    } catch(err) {
      ctx.body = '抛错了' + err
    }
  }
}
module.exports = { find, login, registered }