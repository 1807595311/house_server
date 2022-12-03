const multipleFile = require(path.resolve(__basename, "utils/upload.js"));
const multer = require("multer");
// 修改用户头像
module.exports = (req,res)=>{
    try{
        let account_number = parseToken(req.headers.authorization);
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
                db.query(sqlStr.edit_headimg({url,account_number}), (error, result) => {
                    if(error) return res.send({ msg: '修改头像失败' + err, status: -1 });
                    if (result.affectedRows === 1){
                        let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
                        let data = {
                            head_img: fileUrl + url
                        }
                        res.send({ msg: '修改头像成功',data, status: 0 });
                    }
                })
            }
        });
    }catch(err){
        res.send({ msg: '修改头像导致服务器错误' + err, status: -1 });
    }
}