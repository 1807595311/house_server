// 修改用户密码
module.exports = (req,res)=>{
    try{
        let account_number = parseToken(req.headers.authorization);
        db.query(sqlStr.cancellation_user({account_number}), (err, result) => {
            if (err) return res.send({ msg: '注销失败' + err, status: -1 });
            if (result.affectedRows === 1) res.send({ msg: '注销成功', status: 0 });
        })
    }catch(err){
        res.send({ msg: '服务器错误' + err, status: -1 });
    }
}