// 删除房屋
module.exports = async (req, res) => {
    let account_number = parseToken(req.headers.authorization);
    let data = req.body;
    try{
        db.query(sqlStr.delete_house({...data,account_number}),(err, result) => {
            if (err) return res.send({ msg: '删除失败' + err, status: -1 });
            if(result.affectedRows === 1) res.send({ msg: '删除成功',status: 0});
        })

    }catch(err){}
}