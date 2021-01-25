var express = require('express');
var router = express.Router();

let Article = require('../models/article')

//添加博客接口
// 创作中心数据插入
router.post('/add', (req, res, next) => {
    //向数据库添加文章信息
    let articleInfo = {
      title: req.body.title,
      date: req.body.date,
      content: req.body.content,
      img: req.body.img,
    }
  
    //文章数据 放入模型
    let articleI = new Article(articleInfo)
    //保存
    articleI.save((err, result) => {
      if (!err) {
        res.send(result)
      }
    })
    console.log(req.body);
  })

module.exports = router