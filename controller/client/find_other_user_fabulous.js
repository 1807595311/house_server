// 查看其他用户点赞列表
module.exports = async (req, res) => {
    try{
        let data = {
            from_account_number: req.body.account_number,
            account_number: parseToken(req.headers.authorization),
            currentPage: req.body.currentPage
        }
        let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
        // 通过账号查询点赞的动态
        let getFabulousByaccount = new Promise((resolve, reject) => {
            let pageSize = 20 * data.currentPage;
            let currentPage = pageSize - 20;
            let dataInfo = {
                account_number: data.from_account_number,
                currentPage
            }
            db.query(sqlStr.find_fabulous_by_account(dataInfo), (err, result) => {
                result[0].forEach(v => v.cover = fileUrl + v.cover);
                resolve(result);
            })
        })
        let result = await Promise.all( [getFabulousByaccount] );
        await res.send({
            msg: '获取其他用户点赞列表成功',
            status: 2,
            data: result[0][0],
            count: result[0][1][0].counts
        })
    }catch(err){
        res.send({msg: `服务器错误:${err}`,status: -1})
    }
}