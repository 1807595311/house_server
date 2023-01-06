// 查询用户联系方式
module.exports = (req,res)=>{
    try{
        let account_number = parseToken(req.headers.authorization);
        db.query(sqlStr.find_contact({account_number}), (err, result) => {
            if (err) return res.send({ msg: '查询失败' + err, status: -1 });
            else res.send({ msg: '查询成功', status: 2,data: result[0] });
        })
    }catch(err){
        res.send({ msg: '服务器错误' + err, status: -1 });
    }
}