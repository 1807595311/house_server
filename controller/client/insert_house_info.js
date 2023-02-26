// 添加房屋信息
module.exports = async (req, res) => {
    let account_number = parseToken(req.headers.authorization);
    let data = req.body;
    try {
        let type = data.id ? 'update' : 'insert'
        db.query(sqlStr.insert_house_info({ ...data,account_number })[type], (err, result) => {
            if (err) return res.send({ msg: err, status: -1 });
            if(result.affectedRows === 1) {
                return res.send({
                    msg: data.id ? '修改成功' : '添加成功',
                    status: 0,
                })
            }
        })

    } catch (err) { }
}