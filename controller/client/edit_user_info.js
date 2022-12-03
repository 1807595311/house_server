// 修改用户资料
module.exports = (req,res)=>{
    try{
        let account_number = parseToken(req.headers.authorization);
        let data = req.body;
        db.query(sqlStr.edit_userinfo({account_number,...data}), (err, result) => {
            if (err) return res.send({ msg: '修改失败' + err, status: -1 });
            if (result.affectedRows === 1) res.send({ msg: '修改成功', status: 0 });
        })
    }catch(err){
        res.send({ msg: '修改资料导致服务器错误' + err, status: -1 });
    }
}