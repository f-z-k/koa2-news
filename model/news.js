const mongoose = require('./db.js');
const newsDetails = new mongoose.Schema({
  news_author: {
    type: String
  },
  news_title: {
    type: String
  },
  news_content: {
    type: String
  },
  news_type: {
    type: String
  },
  create_date: {
    type: Date,
    default: Date.now()
  },
  create_user: {
    type: String
  }
});
module.exports = mongoose.model('news', newsDetails)