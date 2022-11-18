// 动态列表
module.exports = (req, res) => {
    let data = req.query;
    let pageSize = data.pageSize * data.currentPage;
    let currentPage = pageSize - data.pageSize;
    data.pageSize = pageSize;
    data.currentPage = currentPage;
    db.query(sqlStr.getDynamicList(data), (err, result) => {
        if(err) return res.send({ msg: err, status: -1 });
        db.query(sqlStr.getDynamicCount(data), (er, resu) => {
            let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
            result.forEach(v => v.cover = fileUrl + v.cover);
            res.send({
                msg: '获取动态列表成功',
                status: 2,
                count: resu.length,
                data: result
            })
        })
    });
};
