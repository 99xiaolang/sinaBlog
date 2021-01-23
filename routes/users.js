var express = require('express');
var router = express.Router();

// 将用户模板导入
let User = require('../models/user')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addUser',(req,res,next) =>{
//向数据库添加用户信息
let userInfo = {
  userName:req.body.userName,
  password:req.body.password,
  Cpassword:req.body.Cpassword,
}

//用户验证
if(userInfo.password != userInfo.Cpassword){
  let error = {
    status:0,
    stack:''
  }
  res.render('error',{error,message:'密码不一致'})
}

//页面表单数据 放入模型
let userI = new User(userInfo)

//保存
userI.save((err,result) => {
  if(!err){
    res.send(result)
  }
})


  console.log(req.body);
})


module.exports = router;
