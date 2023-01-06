// 修改用户密码
module.exports = (req,res)=>{
    try{
        let account_number = parseToken(req.headers.authorization);
        let data = req.body;
        db.query(sqlStr.edit_consult_read({account_number,...data}), (err, result) => {
            if (err) return res.send({ msg: err, status: -1 });
            if (result.affectedRows === 1) res.send({ msg: '已读', status: 2 });
        })
    }catch(err){
        res.send({ msg: '服务器错误' + err, status: -1 });
    }
}