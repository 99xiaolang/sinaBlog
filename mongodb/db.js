//1.安装
//2.导入安装模块
let mongoose = require('mongoose') // CMD模块化 模块化导入语句
//创建一个数据库地址
let dbUrl = 'mongodb://localhost/blok' //blok数据库名
//创建链接
mongoose
    .connect(dbUrl)
    .then(() => console.log('数据库连接成功'))
    .catch(err => {console.log('数据库连接失败'+err)})

module.exports = mongoose //CMD模块化 导出语句
