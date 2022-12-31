module.exports = (req,res)=>{
    let data = req.body;
    data.is_delete = data.is_delete == 1 ? 0 : 1;
    db.query(sqlStr.changeDynamicState(data), (err, result) => {
        if (err) return res.send({ msg: `操作失败:${err.message}`, status: -1 });
        if(result.affectedRows == 1) return res.send({ msg: `操作成功`, status: 0 });
        else return res.send({ msg: `操作失败`, status: -1 });
    })
}