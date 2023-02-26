// 发送咨询
module.exports = async (req, res) => {
    let data = req.body;
    let account_number = parseToken(req.headers.authorization);
    try{
       const USER_TYPE = new Promise((resolve, reject) => {
            db.query(sqlStr.findUser({ account_number }), (err, result) => {
                if(err) return res.send({ msg: '服务器错误' + err, status: -1 });
                if(result.length > 0) return resolve(Number(result[0].customer_type));
                else return res.send({ msg: '服务器错误', status: -1 });
            })
        })
        let customer_type = await USER_TYPE;
        if( customer_type !== 0 ) return es.send({ msg: '咨询只能由普通用户向设计机构发起', status: -1 });
        db.query(sqlStr.send_consult({account_number,...data}), (err, result) => {
            if (err) return res.send({ msg: '发送失败' + err, status: -1 });
            if (result.affectedRows == 1) return res.send({msg:'发送成功',status: 0});
        })
    } catch (err){
        res.send({msg: err,status: -1});
    }

}