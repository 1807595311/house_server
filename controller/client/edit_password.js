// 修改用户密码

// 密码加密模块
const crypto = require("crypto");
module.exports = (req,res)=>{
    try{
        let account_number = parseToken(req.headers.authorization);
        let data = req.body;
        let md5 = crypto.createHash("md5");
        data.p_password = md5.update(data.p_password).digest("hex");
        // 比对原密码
        db.query(sqlStr.contrast_password({ account_number,password: data.p_password }), (err, result) => {
            if(err) return res.send({ msg: '原密码错误', status: -1 });
            console.log(123124,result);
            if(result.length > 0) {
                let md5 = crypto.createHash("md5");
                data.password = md5.update(data.password).digest("hex");
                db.query(sqlStr.edit_password({account_number,...data}), (err, result) => {
                    if (err) return res.send({ msg: '修改失败' + err, status: -1 });
                    if (result.affectedRows === 1) res.send({ msg: '修改成功', status: 0 });
                })
            }else{
                res.send({ msg: '原密码错误', status: -1 });
            }
        })
    }catch(err){
        res.send({ msg: '服务器错误' + err, status: -1 });
    }
}