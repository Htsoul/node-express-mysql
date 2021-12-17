const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const router =require('./router')
const admin = require('./admin')
const app = express()

//配置模板引擎
app.engine('html', require('express-art-template'))
app.use(express.static('public'))
app.set('views',path.join(__dirname,'./views/'))

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(session({
    // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: 'itcast',
    resave: false,
    saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
  }))

app.use(router)
app.use(admin)
//监听服务器断开
app.listen(3000,()=>{
    console.log('服务器正在运行中......');
})

//导出模块
module.exports = app