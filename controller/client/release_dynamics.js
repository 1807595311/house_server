const multipleFile = require(path.resolve(__basename, "utils/upload.js"));
const multer = require("multer");
const multiparty = require('multiparty');
const jwt = require("jsonwebtoken");

// 发布动态
module.exports = (req, res) => {
    let form = new multiparty.Form();
    let info = null;
    let urlArr = [];
    // 获取用户信息Promise
    let formPro = new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            resolve(JSON.parse(fields.info[0]));
        })
    })
    // 验证token并解析出用户账号
    let token = req.headers.authorization;
    let account_number = null;
    if (!token) return res.send({ msg: "登录信息不存在或已过期，请重新登录", status: -1 });
    if (token.includes("Bearer ")) token = token.split("Bearer ")[1];
    jwt.verify(token, config.tokenEncryption.salt, (err, decoded) => {
        account_number = decoded.data
    });
    multipleFile(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.log("---errMulterError---", err);
        } else if (err) {
            console.log("---err---", err);
        }
        for (let i = 0; i < req.files.length; i++) {
            info = await formPro;
            // 重新设置存储在数据库的 url 地址，去掉前面的public字符串方便读取
            let destination = req.files[i].destination.substring(6);
            let url = `${destination}/${req.files[i].filename}`;

            
            let data = {
                title: info.title,
                content: info.contentHTML,
                account_number,
                cover: url
            }
            // 获取images表id
            db.query(sqlStr.inster_dynamic(data), url, (err, result) => {
                if (err) return res.send({ msg: '注册失败，写入图片失败', status: -1 });
                if (result.affectedRows === 1) {
                    res.send({ msg: '发布成功', status: 0 });
                }
            })

        }
    })
}