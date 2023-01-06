// 发送咨询
module.exports = async (req, res) => {
    let data = req.body;
    let account_number = parseToken(req.headers.authorization);
    try{
        db.query(sqlStr.send_consult({account_number,...data}), (err, result) => {
            console.log(err);
            if (err) return res.send({ msg: '发送失败' + err, status: -1 });
            if (result.affectedRows == 1) return res.send({msg:'发送成功',status: 0});
        })
    } catch (err){
        res.send({msg: err,status: -1});
    }

}