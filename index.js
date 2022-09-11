// 入口层

global.path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

// 保存当前文件的绝对路径   D:\admin_ycy\node.js\home_website\server
global.__basename = __dirname;

// 导入服务器基础配置
global.config = require(path.resolve(__basename, 'config/config.js'));

// 导入sql语句并设为全局
global.sqlStr = require(path.resolve(__basename, 'db/sqlStr.js'));

// 导入数据库连接实例 设为全局
global.db = mysql.createPool(config.dataBaseOptions);

// 导入路由层
let routes = require(path.resolve(__basename, 'routes/routes.js'))

// 导入token验证白名单
let whiteList = require(path.resolve(__basename, 'utils/whiteList.js'))

// 实例化experss
let app = new express();

// 解析post请求体
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// 设置静态资源路径
app.use(config.virtualPath.url, express.static(path.resolve(__dirname, "public")));

app.all("*", (req, res, next) => {
    //允许指定域名请求
    res.header("Access-Control-Allow-Origin", req.headers.origin); // 动态域名
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With,yourHeaderFeild");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    // 让第一次options请求快速结束。
    if (req.method == "OPTIONS") {
        // res.sendStatus(200);
        res.send(true);
    } else {
        next();
    }
});

// token拦截验证
app.use((req, res, next) => {
    let url = req.url.split('?')[0];
    if (whiteList.indexOf(url) != -1) return next();
    let token = req.headers.authorization;
    jwt.verify(token, config.tokenEncryption.salt, (err, decoded) => {
        if (err) {
            console.log('1112222aaaa',err,decoded);
            res.send({ msg: "登录信息不存在或已过期，请重新登录", status: -1 });
        }
        else return next();
    });
});

// 加载路由层
routes(app);

// 处理404
app.use((req, res) => {
    res.status(404);
    res.send("NOT FOUND SOURCES");
});

app.listen(config.serverOptions.port, () => {
    console.log(`the server running at ${config.serverOptions.host}:${config.serverOptions.port}`);
});
