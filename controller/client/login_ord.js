// token生成模块
const jwt = require("jsonwebtoken");
// 密码加密模块
const crypto = require("crypto");
module.exports = (req, res) => {
    let userInfo = req.body;
    // 密码加密
    let md5 = crypto.createHash("md5");
    userInfo.password = md5.update(userInfo.password).digest("hex");
    // 登录查询
    db.query(sqlStr.find_orduser_or_desuser(userInfo), (err, result) => {
        if (err) return res.send({ msg: `登录失败${err}`, status: -1 });
        if (result.length < 1) return res.send({ msg: '账号未被注册', status: -1 });
        else {
            // 当前用户状态
            let resultUserInfo =  result[0];
            if(resultUserInfo.state == 0) return res.send({msg: '账号被管理员禁用，原因：' + resultUserInfo.disable_reason,status: -1});
            db.query(sqlStr.login_ord(userInfo), (err, result) => {
                if (err) {
                    console.log('err2==>', err);
                    res.send({ msg: `登录失败:${err.message}`, status: -1 });
                }
                if (result.length >= 1) {
                    // 生成token
                    let token = jwt.sign(
                        { data: userInfo.account_number}, // 签名token数据
                        config.tokenEncryption.salt, // 加盐(强化加密)
                        { expiresIn: config.tokenEncryption.expiresIn } // 有效期
                    );
                    // 查找对应用户头像
                    db.query(sqlStr.find_user_img_url(resultUserInfo), (img_err, img_res) => {
                        let head_img = '';
                        if (img_err) {
                            head_img = err.message;
                        }
                        if(img_res.length >= 1){
                            head_img = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}${img_res[0].head_img}`
                        }
                        let user_info = {
                            head_img,
                            account_number: resultUserInfo.account_number,
                            nickname: resultUserInfo.nickname,
                            customer_type: resultUserInfo.customer_type
                        };
                        res.send({ msg: '登录成功', status: 0, data: { token , user_info }});
                    })

                } else {
                    res.send({ msg: '账号或密码错误', status: -1 });
                }
            });
        }
    });
};