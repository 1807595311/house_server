module.exports = (req, res) => {
    // return console.log(req.body);
    let userInfo = req.body;
    db.query(sqlStr.findUser(userInfo), (err, result) => {
        // 失败
        if (err) return res.send({ msg: `注册失败${err}`, status: -1 });
        // 成功
        if (result.length > 0) return res.send({ msg: '账号已被注册', status: -1 });
        else {
            userInfo = { ...userInfo, headimg: 1 };
            let u = {
                ...userInfo,
                nickname: userInfo.nickname ? userInfo.nickname : `管理员`,
                introduce: userInfo.introduce ? userInfo.introduce : '该用户很懒，什么都没留下',
                customer_type: userInfo.customer_type ? userInfo.customer_type : 0
            }
            db.query(sqlStr.insertUsersStr(u), (err2, result2) => {
                if (err2) {
                    console.log('err2==>', err2);
                    res.send({ msg: `注册失败:${err2.message}`, status: -1 });
                }
                if (result2.affectedRows === 1) {
                    res.send({ msg: '注册成功', status: 0 });
                }else{
                    res.send({ msg: '注册失败', status: -1 });
                }
            });
        }
    });
};
