// 点赞
module.exports = async (req, res) => {
    let data = req.body;
    try{
        let sqlData = { account_number: data.account_number, dynamic_id: data.dynamic_id };
        // 查询该用户是否已经对该动态点赞
        db.query(sqlStr.find_fabulous(sqlData), (err, result) => {
            if(result.length > 0){
                db.query(sqlStr.delete_likes(sqlData), (err1, result1) => {
                    if(err1) return res,send({msg:err,status: -1});
                    if(result1.affectedRows == 1) return res.send({msg:'取消点赞成功',status: 0});
                })
            }else{
                db.query(sqlStr.inster_like(data), (err2, result2) => {
                    if(err2) return res,send({msg:err2,status: -1});
                    if(result2.affectedRows == 1) return res.send({msg:'点赞成功',status: 0});
                })
            }
        })
    } catch (err){
        res.send({msg: err,status: -1});
    }

}