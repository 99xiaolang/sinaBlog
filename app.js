var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//导入
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersRouter = require('./routes/article');

var app = express();

//配置
app.use(session({
  secret:'bname',// 自己命名
  resave:false,// 发送请求的时候重新保存session
  saveUninitialized:true,// 保存初始化状态
  cookie:{maxAge:1000*60*60*24}// 存储的信息在客户端cookie 保存时间
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// 登录拦截
// 所有访问我们网站的用户如果没有登录，让他去登录
// 访问页面时
// 先获取userName——————req.session.userName
// 如果能获取到，直接访问
// 如果不能重定向到登陆注册页面
app.get('*',(req,res,next) => {
  let userName = req.session.userName
  // 访问登录与注册不需要拦截
  // 路由
  // 如果用户名不存在再判断路由
  if(!userName){
    let path = req.path
    // path不是登陆也不是注册
    if(path !== '/login' && path !== '/signIn'){
      // 拦截重定向
      // return res.redirect('/login')
    }
  }
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
