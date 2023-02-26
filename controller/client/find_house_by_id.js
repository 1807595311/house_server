// 根据id获取房屋信息
module.exports = async (req, res) => {
    let data = req.query;
    try {
        db.query(sqlStr.find_house_by_id({ id: data.id }), (err, result) => {
            if (err) return res.send({ msg: '获取房屋信息失败' + err, status: -1 });
            res.send({
                msg: '获取房屋信息成功',
                status: 2,
                data: result[0]
            })
        })
    } catch (err) { }
}