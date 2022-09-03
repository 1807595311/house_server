const multer = require("multer");
const fs = require("fs");
const generateMixed = require("./generateMixed");
const upload = multer({
    storage: multer.diskStorage({
        //设置文件存储位置
        destination: function (req, file, cb) {
            let date = new Date();
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, "0");
            let day = date.getDate();
            // 设置存储路径，由于我的静态资源目录是设置的 public，所以设置在 public 文件下
            // let dir = `public/upload/${file.fieldname}/${year}${month}${day}`;
            let dir = `public/upload/${year}${month}${day}`;

            //判断目录是否存在，没有则创建
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {
                    recursive: true,
                });
            }
            cb(null, dir);
        },
        //设置文件名称
        filename(req, file, cb) {
            // 重命名文件名，防止重复
            let imgType = file.mimetype.split('/')[1];
            // return console.log(imgType);
            // let fileName = file.fieldname + "_" + Date.now() + "_" + file.originalname;
            let fileName = `${Date.now()}_${generateMixed(6)}.${imgType}`;
            cb(null, fileName);
        },
    }),
});

// 常用的两方法：多选用 array(),单选用single（）
const multipleFile = upload.array("file", 3);
module.exports = multipleFile;