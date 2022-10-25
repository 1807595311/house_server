// 中间件层
const jwt = require("jsonwebtoken");
// 导入token验证白名单
let whiteList = require(path.resolve(__basename, 'utils/whiteList.js'))
module.exports = (app) => {
    app.all("*", (req, res, next) => {
        //允许指定域名请求
        res.header("Access-Control-Allow-Origin", req.headers.origin); // 动态域名
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With,yourHeaderFeild");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Credentials", true);
        // 让第一次options请求快速结束。
        if (req.method == "OPTIONS") {
            // res.sendStatus(200);
            res.send({status:1});
        } else {
            next();
        }
    });

    // token拦截验证
    app.use((req, res, next) => {
        let url = req.url.split('?')[0];
        if (whiteList.indexOf(url) != -1) return next();
        
        let token = req.headers.authorization;
        
        if (!token) return res.send({ msg: "登录信息不存在或已过期，请重新登录", status: -1 });
        if(token.includes("Bearer ")) token = token.split("Bearer ")[1];
        jwt.verify(token, config.tokenEncryption.salt, (err, decoded) => {
            if (err) {
                return res.send({ msg: "登录信息不存在或已过期，请重新登录", status: -2 });
            }
            else {
                console.log('token验证通过');
                return next();
            }
        });
    });
}