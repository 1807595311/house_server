// 查询我的评论
module.exports = async (req, res) => {
    try{
        let account_number = parseToken(req.headers.authorization);
        let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
        let formatFileUrl = (arr)=>{
            arr.forEach(v => v.head_img = fileUrl + v.head_img);
            return arr;
        }
        // 查询关注我的消息
        let follows = new Promise((resolve, reject) => {
            db.query(sqlStr.find_my_comment({account_number}), (err, result) => resolve(result) )
        })
        let result = await follows;
        let data = formatFileUrl(result);
        await res.send({
            msg: '获取我的评论成功',
            status: 2,
            data
        })
    }catch(err){
        res.send({msg: `服务器错误:${err}`,status: -1})
    }
}