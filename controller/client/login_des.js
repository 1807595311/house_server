const jwt = require("jsonwebtoken");
module.exports = (req, res) => {
    let userInfo = req.body;
    db.query(sqlStr.find_orduser_or_desuser(userInfo), (err, result) => {
        // 失败
        if (err) return res.send({ msg: `登录失败${err}`, status: -1 });
        // 成功
        if (result.length < 1) {
            return res.send({ msg: '账号未被注册', status: -1 });
        } else {
            // 当前用户状态
            let resultUserInfo =  result[0];
            if(resultUserInfo.state == 0) return res.send({msg:'您的账号状态异常，禁止登录',status: -1});
            db.query(sqlStr.login_des(userInfo), (err, result) => {
                if (err) {
                    console.log('err2==>', err);
                    res.send({ msg: `登录失败:${err.message}`, status: -1 });
                }
                // console.log(1231231,result);
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