var express = require('express');
var router = express.Router();

//文章模板导入
let Article = require('../models/article')
//上传文件工具multiparty导入
var Multiparty = require('multiparty')

//导入文件
let fs = require('fs')

//添加博客接口
// 创作中心数据插入
router.post('/add', (req, res, next) => {
  let nId = req.body.dId || ''
  if (!nId) {
    //向数据库添加文章信息
    let articleInfo = {
      title: req.body.title,
      date: Date.now(),
      author: req.body.author,
      content: req.body.content,
      img: req.body.img,
    }

    //文章数据 放入模型
    let articleI = new Article(articleInfo)
    //保存
    articleI.save((err, result) => {
      if (!err) {
        res.redirect('/')
      }
    })
  } else {
    let page = req.body.page
    let articleData = {
      title:req.body.title,
      author:req.body.author,
      date:Date.now(),
      content:req.body.content,
    }

    Article.findByIdAndUpdate(nId,articleData,{new:true},(err,result) => {
      if(!err){
        res.redirect(`/?page=${page}`)
      }
    })
  }
})

// 设置新的图片路由
router.post('/upload', (req, res, next) => {
  //图片文件上传的操作
  //console.log(req.body);
  //实例化multiparty的form类
  let form = new Multiparty.Form();
  //使用path，获取文件信息
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
    }
    // console.log(fields+'第一个');
    // console.log(files.upload[0]);
    let file = files.upload[0]
    // 将读取到的文件信息，及文件上传到本项目下，也就是服务器
    // 读取文件流
    let rStream = fs.createReadStream(file.path)
    // 拼接路径
    let filePath = '/uploads/' + file.originalFilename
    // 写入文件流
    let wStream = fs.createWriteStream('./public' + filePath)
    // 触发读写管道，实现上传
    rStream.pipe(wStream)
    // 将文件返回给ckeditor这个插件
    wStream.on('close', () => {
      res.send({ uploaded: 1, url: filePath })//将服务器端图片地址拿给文本框,使得文章能够正确加载插图
    })
  })
})

//文章删除的接口
router.get('/delete',(req,res,next) => {
  //从接口接收传输的id和页码page
  let id = req.query._id
  let page = req.query.page
  //根据id从数据库删除
  Article.deleteOne({_id:id},err => {
    if(!err){
      //返回删除前的页面
      res.redirect(`/?page=${page}`)
    }
  })
})

module.exports = router