// 删除我的评论
module.exports = async (req, res) => {
    try{
        let account_number = parseToken(req.headers.authorization);
        let id = req.body.id;
        let sqlData = {
            is_delete: 0,
            account_number,
            id
        }
        db.query(sqlStr.delete_comment(sqlData), (err, result) => {
            if(err) return res.send({msg:err,status: -1});
            if(result.affectedRows == 1) return res.send({msg:'删除评论成功',status: 0});
            res.send({
                msg: '删除成功',
                status: 0
            })
        })
    }catch(err){
        res.send({msg: `服务器错误:${err}`,status: -1})
    }
}