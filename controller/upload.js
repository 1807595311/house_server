const multipleFile = require(path.resolve(__basename, "utils/upload.js"));
const multer = require("multer");
module.exports = (req, res) => {
    let urlArr = [];

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

            // 将图片地址存放在数据库images表
            // 3、使用数组的形式，依次为 ? 占位符指定具体的值
            db.query(sqlStr.insertImagesStr, url, (err, result) => {
                if (err) res.send({msg: `上传失败:${err.message}`,status: -1});
                // 成功
                if (result.affectedRows === 1) {
                    urlArr.push({
                        url: `${config.serverOptions.host}:${config.serverOptions.port}/static/file` + url,
                        id: result.insertId
                    });
                    res.send({msg: '上传成功',status: 0,data:urlArr});
                }
            });
        }
    });
};
