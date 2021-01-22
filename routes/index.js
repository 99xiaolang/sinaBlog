var express = require('express');
var router = express.Router();

// 首页
router.get('/', function(req, res) {
  res.render('index', {});
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
  res.render('write', {});
});
//详情页
router.get('/blokInfo', function(req, res) {
  res.render('blokInfo', {});
});
module.exports = router;
