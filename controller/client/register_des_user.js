const multipleFile = require(path.resolve(__basename, "utils/upload.js"));
const multer = require("multer");
const multiparty = require('multiparty');

module.exports = (req, res) => {
    let urlArr = [];

    let form = new multiparty.Form();
    let userInfo = null;
    // 获取用户信息Promise
    let formPro = new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            resolve(JSON.parse(fields.userInfo[0]));
        })
    })
    multipleFile(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log("---errMulterError---", err);
        } else if (err) {
            console.log("---err---", err);
        }
        for (let i = 0; i < req.files.length; i++) {

            // 查询是否被注册，被注册直接向客户端返回被注册，没被注册则将图片地址插入数据库，并将结果返回给Promise
            let pro = new Promise((resolve, reject) => {
                // 获取用户信息
                formPro.then(res_userInfo => {
                    userInfo = res_userInfo;
                    // 执行sql查询用户
                    db.query(sqlStr.findUser(userInfo), (err, result) => {
                        if (err) return res.send({ msg: '注册失败', status: -1 });
                        if (result.length > 0) return res.send({ msg: '用户已被注册', status: -1 });
                        else { // 执行sql插入图片
                            // 重新设置存储在数据库的 url 地址，去掉前面的public字符串方便读取
                            let destination = req.files[i].destination.substring(6);
                            let url = `${destination}/${req.files[i].filename}`;
                            urlArr.push(`${config.serverOptions.host}:${config.serverOptions.port}/static/file` + url);

                            db.query(sqlStr.insertImagesStr, url, (err2, result2) => {
                                if (err2) return res.send({ msg: '注册失败，写入图片失败', status: -1 });
                                if (result2.affectedRows === 1) resolve(result2);
                            })
                        }
                    })
                })
            })
            pro.then(result => {
                let u = { ...userInfo, headimg: result.insertId, customer_type: 1 };
                // 插入users表
                db.query(sqlStr.insertUsersStr(u), (err2, result2) => {
                    if (err2) return res.send({ msg: `注册失败:${err2.message}`, status: -1 });
                    if (result2.affectedRows === 1) {
                        // 插入普通用户表
                        db.query(sqlStr.inster_des_user(userInfo), (err3, result3) => {
                            if (err3) return res.send({ msg: `注册失败:${err3.message}`, status: -1 });
                            if (result3.affectedRows === 1) return res.send({ msg: '注册成功', status: 0 });
                        })
                    }
                })
            })
        }
    });
};
