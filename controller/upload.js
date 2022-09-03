const multipleFile = require(path.resolve(__basename,'utils/upload.js'));
const multer = require("multer");
module.exports = (req,res)=>{
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
                urlArr.push('127.0.0.1:8000/static/file'+url);
    
                const sqlStr = "insert into images (head_img) values (?)";
                // 3、使用数组的形式，依次为 ? 占位符指定具体的值
                db.query(sqlStr, url, (err, res) => {
                    if (err) return console.log(err.message);
                    // 成功
                    if (res.affectedRows === 1){
                        console.log('插入数据库的id',res.insertId);
                        console.log('插入成功==>',res);
                    }
                });
            }
            res.send(urlArr);
        });
}