module.exports = async (req, res) => {
    let account_number = parseToken(req.headers.authorization);
    let data = req.body;
    let pageSize = data.pageSize * data.currentPage;
    let currentPage = pageSize - data.pageSize;
    data.pageSize = pageSize;
    data.currentPage = currentPage;
    data.account_number = account_number;
    console.log(sqlStr.find_fabulous_by_account(data));
    try{
        db.query(sqlStr.find_fabulous_by_account(data), (err, result) => {
           if(err) return  res.send({msg: err,status: -1});
           let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
           result.forEach(v => v.cover = fileUrl + v.cover);
           res.send({
            msg: '获取我的点赞列表成功',
            status: 2,
            data: result
           })
        })
    }catch(err){
        res.send({msg: err,status: -1});
    }
}