// 入口层

global.path = require("path");
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");

// 保存当前文件的绝对路径   D:\admin_ycy\node.js\home_website\server
global.__basename = __dirname;

// 导入服务器基础配置
global.config = require(path.resolve(__basename,'config/config.js'));

// 导入数据库连接实例 设为全局
global.db = mysql.createPool(config.dataBaseOptions);

// 导入路由层
let routes = require(path.resolve(__basename, 'routes/routes.js'))
// 实例化experss
let app = new express();
app.all("*", (req, res, next) => {
    //允许指定域名请求
    res.header("Access-Control-Allow-Origin", req.headers.origin); // 动态域名
    res.header("Access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,X-Requested-With,yourHeaderFeild");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    // 让第一次options请求快速结束。
    if (req.method == "OPTIONS") {
        // res.sendStatus(200);
        res.send(200);
    } else {
        next();
    }
});
// 加载路由层
routes(app);

// 解析post请求体
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// 设置静态资源路径
app.use("/static/file", express.static(path.resolve(__dirname, "public")));

// 处理404
app.use((req, res) => {
    res.status(404);
    res.send("NOT FOUND SOURCES");
});

app.listen(config.serverOptions.port, () => {
    console.log(`the server running at ${config.serverOptions.host}:${config.serverOptions.port}`);
});
