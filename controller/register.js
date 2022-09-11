const multipleFile = require(path.resolve(__basename, "utils/upload.js"));
const multer = require("multer");
const multiparty = require('multiparty');

module.exports = (req, res) => {
    let urlArr = [];

    let form = new multiparty.Form();
    let userInfo = null;
    // 用户信息
    let formPro = new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            userInfo = JSON.parse(fields.userInfo[0]);
            resolve(userInfo);
        })

    })
    multipleFile(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log("---errMulterError---", err);
        } else if (err) {
            console.log("---err---", err);
        }
        for (let i = 0; i < req.files.length; i++) {
            // 重新设置存储在数据库的 url 地址，去掉前面的public字符串方便读取
            let destination = req.files[i].destination.substring(6);
            let url = `${destination}/${req.files[i].filename}`;
            urlArr.push(`${config.serverOptions.host}:${config.serverOptions.port}/static/file` + url);
            // 获取用户信息
            formPro.then(formPro_res => {
                userInfo = formPro_res;
                return userInfo;
            }).then(userInfo_res => {
                db.query(sqlStr.findUser(userInfo_res), (err, result) => {
                    // 失败
                    if (err) return res.send({ msg: `注册失败${err}`, status: -1 });
                    // 成功
                    if (result.length > 0) return res.send({ msg: '账号已被注册', status: -1 });
                    else {
                        let insertImages = new Promise((resolve, reject) => {
                            db.query(sqlStr.insertImagesStr, url, (err, result) => {
                                // 失败
                                if (err) reject(err);
                                // 成功
                                if (result.affectedRows === 1) resolve(result);
                            });
                        })
                        insertImages.then(ins_img_res => {
                            userInfo = { ...userInfo, headimg: ins_img_res.insertId };
                            let u = {
                                ...userInfo,
                                nickname: userInfo.nickname ? userInfo.nickname : `用户${userInfo.account_number}`,
                                introduce: userInfo.introduce ? userInfo.introduce : '该用户很懒，什么都没有留下',
                                customer_type: userInfo.customer_type ? userInfo.customer_type : 0
                            }
                            db.query(sqlStr.insertUsersStr(u), (err2, result2) => {
                                if (err2) {
                                    console.log('err2==>', err2);
                                    res.send({ msg: `注册失败:${err2.message}`, status: -1 });
                                }
                                if (result2.affectedRows === 1) {
                                    res.send({ msg: '注册成功', status: 0 });
                                }
                            });
                        })
                    }
                });
            })
        }
    });
};
