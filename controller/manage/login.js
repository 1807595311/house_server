const jwt = require("jsonwebtoken");
module.exports = (req, res) => {
    let userInfo = req.body;
    console.log(11111, sqlStr.manage_login(userInfo));
    db.query(sqlStr.findUser(userInfo), (err, result) => {
        // 失败
        if (err) return res.send({ msg: `登录失败${err}`, status: -1 });
        // 成功
        if (result.length < 1) return res.send({ msg: '账号未被注册', status: -1 });
        else {
            db.query(sqlStr.manage_login(userInfo), (err, result) => {
                console.log(2222, result);
                if (err) {
                    console.log('err2==>', err);
                    res.send({ msg: `登录失败:${err.message}`, status: -1 });
                }
                if (result.length >= 1) {
                    // 生成token
                    let token = jwt.sign(
                        { data: userInfo.account_number}, // 签名token数据
                        "t_t", // 加盐(强化加密)
                        { expiresIn: "1d" }
                    );
                    res.send({ msg: '登录成功', status: 0, data: { token }});
                } else {
                    res.send({ msg: '账号或密码错误', status: -1 });
                }
            });
        }
    });
};