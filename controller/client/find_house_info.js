// '获取房屋列表
module.exports = async (req, res) => {
    let account_number = parseToken(req.headers.authorization);
    try {
        db.query(sqlStr.find_house_list({ account_number }), (err, result) => {
            if (err) return res.send({ msg: '获取房屋列表失败' + err, status: -1 });
            
            res.send({
                msg: '获取房屋列表成功',
                status: 2,
                data: result
            })
        })

    } catch (err) { }
}