var express = require('express');
var router = express.Router();

//文章模板导入
let Article = require('../models/article')
//时间转化工具包导入
let moment = require('moment')

// 首页
router.get('/', async function(req, res) {
  let cPage = req.query.page || 1
  // let data = await Article.find()
  // console.log(data);
  let userName = req.session.userName || ''
  let data = {
    blogList:[],//文章列表
    currPage:cPage,//当前页数
    PagesTotle:'',//总页数
  }

  //设定每页渲染条数
  let pageSize = 4
  //确定每页显示的数据
  data.blogList = await Article.find()
    .limit(pageSize)//限定展示出来的条数
    .sort({_id:'desc'})
    .skip((data.currPage - 1)*pageSize)//限定从第几条开始截取
  //总数据
  let blogAll = await Article.find()
  //总页码
  data.PagesTotle = Math.ceil(blogAll.length / pageSize)
  // console.log(data.PagesTotle);
  data.blogList.map(item => {
    let a = moment(item.date).utcOffset(480).format( 'YYYY-MM-DD HH:mm:ss');
    item['time'] = a
  })
  
  res.render('index', {userName,data});
});
// 登录
router.get('/login', function(req, res) {
  res.render('login', {});
});
// 注册
router.get('/signIn', function(req, res) {
  res.render('signIn', {});
});
//创作中心
router.get('/write',async function(req, res) {
  let userName = req.session.userName || ''
  let blokId = req.query._id || ''
  // console.log(blokId);
  //判断blokId是否为true
  if(blokId){
    let page = req.query.page
    console.log(page);
    let data = await Article.findOne({_id:blokId})
    res.render('write', {userName,data});
  }else{
    //如果为false
    res.render('write', {userName});
  }
});
//详情页
router.get('/blokInfo',async function(req, res) {
  let blokId = req.query._id
  console.log(blokId);

  let data = await Article.findOne({_id:blokId})

  data['time'] = moment(data.date).utcOffset(480).format( 'YYYY-MM-DD HH:mm:ss');

  res.render('blokInfo', {data});
});
module.exports = router;
