// 关注
module.exports = async (req, res) => {
    let data = req.body;
    let account_number = parseToken(req.headers.authorization);
    try{
        let sqlData = { account_number, f_account_number: data.f_account_number };
        // 查询该是否已关注该用户
        db.query(sqlStr.find_follow(sqlData), (err, result) => {
            if(err) return res.send({msg: err,status: -1});
            if(result.length > 0){
                db.query(sqlStr.delete_follow(sqlData), (err1, result1) => {
                    if(err1) return res.send({msg:err,status: -1});
                    if(result1.affectedRows == 1) return res.send({msg:'取消关注成功',status: 0});
                })
            }else{
                db.query(sqlStr.inster_follow(sqlData), (err2, result2) => {
                    if(err2) return res.send({msg:err2,status: -1});
                    if(result2.affectedRows == 1) return res.send({msg:'关注成功',status: 0});
                })
            }
        })
    } catch (err){
        res.send({msg: err,status: -1});
    }

}