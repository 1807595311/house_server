const multipleFile = require(path.resolve(__basename, "utils/upload.js"));
const multer = require("multer");
const multiparty = require('multiparty');
const jwt = require("jsonwebtoken");

// 编辑动态
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
        if (err instanceof multer.MulterError) console.log("---errMulterError---", err);
        else if (err) console.log("---err---", err);
        info = await formPro;
        // 判断是否有修改封面
        if (req.files.length > 0) {
            for (let i = 0; i < req.files.length; i++) {
                let destination = req.files[i].destination.substring(6);
                let url = `${destination}/${req.files[i].filename}`;

                let data = {
                    id: info.id,
                    title: info.title,
                    content: info.contentHTML,
                    content_md: info.contentMD,
                    tags: info.tags,
                    account_number,
                    cover: url
                }
                db.query(sqlStr.update_dynamic(data), (err, result) => {
                    if (err) return res.send({ msg: '修改失败' + err, status: -1 });
                    if (result.affectedRows === 1) {
                        res.send({ msg: '修改成功', status: 0 });
                    }
                })
            }
        } else {
            let data = {
                id: info.id,
                title: info.title,
                content: info.contentHTML,
                content_md: info.contentMD,
                tags: info.tags,
                account_number
            }
            db.query(sqlStr.update_dynamic(data), (err, result) => {
                if (err) return res.send({ msg: '修改失败' + err, status: -1 });
                if (result.affectedRows === 1) {
                    res.send({ msg: '修改成功', status: 0 });
                }
            })
        }
    })
}