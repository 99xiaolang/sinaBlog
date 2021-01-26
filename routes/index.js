var express = require('express');
var router = express.Router();

//文章模板导入
let Article = require('../models/article')

// 首页
router.get('/', async function(req, res) {
  let data = await Article.find()
  // console.log(data);
  let userName = req.session.userName || ''
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
router.get('/write', function(req, res) {
  let userName = req.session.userName || ''
  res.render('write', {userName});
});
//详情页
router.get('/blokInfo', function(req, res) {
  res.render('blokInfo', {});
});
module.exports = router;
