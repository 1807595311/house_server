module.exports = (req,res)=>{
    let data = req.body;
    data.state = data.state == 1 ? 0 : 1;
    db.query(sqlStr.changeUserState(data), (err, result) => {
        if (err) return res.send({ msg: `修改失败:${err.message}`, status: -1 });
        if(result.affectedRows == 1) return res.send({ msg: `修改成功`, status: 0 });
        else return res.send({ msg: `修改失败`, status: -1 });
    })
}