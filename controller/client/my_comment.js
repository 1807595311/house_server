// 查询我的评论
module.exports = async (req, res) => {
    try{
        let account_number = parseToken(req.headers.authorization);
        let reqBody = req.body;
        let pageSize = 20 * reqBody.currentPage;
        let currentPage = pageSize - 20;
        let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
        let formatFileUrl = (arr)=>{
            arr.forEach(v => v.head_img = fileUrl + v.head_img);
            return arr;
        }
        // 查询关注我的消息
        let follows = new Promise((resolve, reject) => {
            db.query(sqlStr.find_my_comment({account_number,...reqBody,currentPage}), (err, result) => resolve(result) )
        })
        let result = await follows;
        let data = formatFileUrl(result[0]);
        await res.send({
            msg: '获取我的评论成功',
            status: 2,
            data,
            count: result[1][0].counts
        })
    }catch(err){
        res.send({msg: `服务器错误:${err}`,status: -1})
    }
}