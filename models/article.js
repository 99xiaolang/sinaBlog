let mongoose = require('../mongodb/db')
//Schema
let Schema = mongoose.Schema

let articleSchema = new Schema({
    title:String,
    date:Number,
    author:String,
    content:String,
    img:String,
})

//Model------将会生成数据库集合名(复数)
let Article = mongoose.model('articles',articleSchema)

module.exports = Article