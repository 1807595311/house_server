// 删除咨询
module.exports = async (req, res) => {
    try {
        let account_number = parseToken(req.headers.authorization);
        let data = req.body;
        const USER_TYPE = new Promise((resolve, reject) => {
            db.query(sqlStr.findUser({ account_number }), (err, result) => {
                if(err) return res.send({ msg: '服务器错误' + err, status: -1 });
                if(result.length > 0) return resolve(Number(result[0].customer_type));
                else return res.send({ msg: '服务器错误', status: -1 });
            })
        })
        let customer_type = await USER_TYPE;
        let type =  customer_type === 0 ? 'ord' : customer_type === 1 ? 'des' : '';
        db.query(sqlStr.delete_consult({ account_number, ...data })[type], (err, result) => {
            if (err) return res.send({ msg: '删除失败' + err, status: -1 });
            if(result.affectedRows === 1) res.send({ msg: '删除成功',status: 0});
        })
    } catch (err) {
        res.send({ msg: `服务器错误:${err}`, status: -1 })
    }
}