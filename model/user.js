const mongoose = require('./db.js');
const userInfo = new mongoose.Schema({
  user_name: {
    type: String
  },
  user_pwd: {
    type: String
  },
  register_date: {
    type: Date,
    default: Date.now()
  },
  access_token: {
    type: String
  }
});
module.exports = mongoose.model('users', userInfo)