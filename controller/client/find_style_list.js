// 查询装修风格
module.exports = async (req, res) => {
    db.query(sqlStr.find_style(), (err, result) => {
        if (err) return res.send({ msg: err, status: -1 });
        res.send({msg:'获取风格列表成功',status: 2, data: result})
    })
}