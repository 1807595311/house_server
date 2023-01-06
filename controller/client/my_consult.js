// 查询我的咨询
module.exports = async (req, res) => {
    try {
        let account_number = parseToken(req.headers.authorization);
        let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
        let formatFileUrl = (arr) => {
            arr.forEach(v => v.head_img = fileUrl + v.head_img);
            return arr;
        }
        const USER_TYPE = new Promise((resolve, reject) => {
            db.query(sqlStr.findUser({ account_number }), (err, result) => {
                if(err) return res.send({ msg: '服务器错误' + err, status: -1 });
                if(result.length > 0) return resolve(Number(result[0].customer_type));
                else return res.send({ msg: '服务器错误', status: -1 });
            })
        })
        let customer_type = await USER_TYPE;
        let type =  customer_type === 0 ? 'ord' : customer_type === 1 ? 'des' : '';
        db.query(sqlStr.find_consult_by_account({ account_number })[type], (err, result) => {
            if (err) return res.send({ msg: '获取我的咨询失败' + err, status: -1 });

            res.send({
                msg: '获取我的咨询成功',
                status: 2,
                data: formatFileUrl(result)
            })
        })
    } catch (err) {
        res.send({ msg: `服务器错误:${err}`, status: -1 })
    }
}