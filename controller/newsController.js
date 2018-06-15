const News = require('./../model/news.js');
const lists = async (ctx) => {
  let newsList = await News.find({});
  ctx.body = {
    newsList,
    success: true
  }
}
const addNews = async (ctx) => {
  let newsInfo = {
    news_author: '魁',
    news_title: '题',
    news_content: '<p>content</p>',
    news_type: 'hot',
    create_user: '樊中魁'
  }
  let addNews = await News.create(newsInfo)
  ctx.body = {
    ...addNews,
    success: true
  }
}
module.exports = { lists, addNews }