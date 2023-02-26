module.exports = async (req, res) => {
    let account_number = parseToken(req.headers.authorization);
    let reqBody = req.body;
    let pageSize = 20 * reqBody.currentPage;
    let currentPage = pageSize - 20;
    try{
        console.log(sqlStr.find_collection_by_account({...reqBody,account_number,currentPage}));
        await db.query(sqlStr.find_collection_by_account({...reqBody,account_number,currentPage}), (err, result) => {
           if(err) return  res.send({msg: err,status: -1});
           let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
           result[0].forEach(v => v.cover = fileUrl + v.cover);
           res.send({
            msg: '获取我的收藏列表成功',
            status: 2,
            data: result[0],
            count: result[1][0].counts
           })
        })
    }catch(err){
        res.send({msg: err,status: -1});
    }
}