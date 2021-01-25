var express = require('express');
var router = express.Router();
const Joi = require('joi');

// 将用户模板导入
let User = require('../models/user')


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//注册验证
router.post('/addUser', async (req, res, next) => {
  //向数据库添加用户信息
  let userInfo = {
    userName: req.body.userName,
    password: req.body.password,
    Cpassword: req.body.Cpassword,
  }
  //用户验证
  // if(userInfo.password != userInfo.Cpassword){
  //   let error = {
  //     status:0,
  //     stack:''
  //   }
  //   res.render('error',{error,message:'密码不一致'})
  // }
  const schema = Joi.object({
    userName: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规范')),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
    Cpassword: Joi.ref('password'),
  })
  try {
    const value = await schema.validateAsync(userInfo);
  }
  catch (err) {
    console.log(err.message);
  }
  //页面表单数据 放入模型
  let userI = new User(userInfo)
  //保存
  userI.save((err, result) => {
    if (!err) {
      res.send(result)
    }
  })
  console.log(req.body);
})


//登录
router.post('/login', (req, res, next) => {
  // 从表单获取数据
  let userInfo = {
    userName: req.body.userName,
    password: req.body.password
  }
  console.log(userInfo);
  User.findOne(userInfo, function (err, result) {
    if (err) {
      return console.log(err);
    }
    if (result == null) {
      console.log('登陆失败');
      res.redirect('/signIn');
    } else {
      //将用户登录信息存储
      req.session.userName = userInfo.userName

      console.log('登陆成功');
      res.redirect('/');
    }
  })
})

module.exports = router;
