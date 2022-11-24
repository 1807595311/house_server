// 动态评论
module.exports = async (req, res) => {
    try{
        let data = req.body;
        db.query(sqlStr.insert_comment(data), (err, result) => {
            if (err) return res.send({ msg: err, status: -1 });
            if(result.affectedRows == 1) return res.send({msg:'评论成功',status: 0});
        })
    }catch(err){
        res.send({ msg: err, status: -1 });
    }

}