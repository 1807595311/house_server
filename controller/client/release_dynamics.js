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
    let account_number = parseToken(req.headers.authorization);
    multipleFile(req, res, async (err) => {
        if (err instanceof multer.MulterError)  console.log("---errMulterError---", err);
        else if (err)  console.log("---err---", err);
        for (let i = 0; i < req.files.length; i++) {
            info = await formPro;
            // 重新设置存储在数据库的 url 地址，去掉前面的public字符串方便读取
            let destination = req.files[i].destination.substring(6);
            let url = `${destination}/${req.files[i].filename}`;
            
            let data = {
                title: info.title,
                content: info.contentHTML,
                content_md: info.contentMD,
                tags: info.tags,
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