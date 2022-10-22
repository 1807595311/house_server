// 入口层

global.path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

// 保存当前文件的绝对路径   D:\admin_ycy\node.js\home_website\server
global.__basename = __dirname;

// 导入服务器基础配置
global.config = require(path.resolve(__basename, 'config/config.js'));

// 导入sql语句并设为全局
global.sqlStr = require(path.resolve(__basename, 'db/sqlStr.js'));

// 导入sql语句并设为全局
global.formatDate = require(path.resolve(__basename, 'utils/formatDate.js'));
// 导入sql语句并设为全局
global.parseToken = require(path.resolve(__basename, 'utils/parseToken.js'));

// 导入数据库连接实例 设为全局
global.db = mysql.createPool(config.dataBaseOptions);

// 导入路由层
let routes = require(path.resolve(__basename, 'routes/routes.js'))

// 导入中间件层
let middleware = require(path.resolve(__basename, 'middleware/middleware.js'))

// 实例化experss
let app = new express();

// 解析post请求体
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// 设置静态资源路径
app.use(config.virtualPath.url, express.static(path.resolve(__dirname, "public")));

// 加载中间件层
middleware(app);

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
