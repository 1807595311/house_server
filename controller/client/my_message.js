// 查询消息记录
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
            db.query(sqlStr.find_message_by_user({account_number}).follows, (err, result) => resolve(result) )
        })
        // 查询收藏我的动态的消息
        let collection = new Promise((resolve, reject) => {
            db.query(sqlStr.find_message_by_user({account_number}).collection, (err, result) => resolve(result) )
        })
        // 查询点赞我的动态的消息
        let fabulous = new Promise((resolve, reject) => {
            db.query(sqlStr.find_message_by_user({account_number}).fabulous, (err, result) => resolve(result) )
        })
        // 查询回复我的评论的消息
        let commentReply = new Promise((resolve, reject) => {
            db.query(sqlStr.find_message_by_user({account_number}).commentReply, (err, result) => resolve(result) )
        })
        // 查询回复我的评论的消息
        let systemNotice = new Promise((resolve, reject) => {
            db.query(sqlStr.find_message_by_user({account_number}).systemNotice, (err, result) => resolve(result) )
        })
        let result = await Promise.all([ follows, collection, fabulous, commentReply,systemNotice ]);
        result[1].forEach(v=> v.type = 'collection');
        result[2].forEach(v=> v.type = 'fabulous' );
        let data = {
            follows: formatFileUrl(result[0]),
            collection: formatFileUrl(result[1]),
            fabulous: formatFileUrl(result[2]),
            comment: formatFileUrl(result[3]),
            systemNotice: result[4]
        }
        await res.send({
            msg: '获取消息成功',
            status: 2,
            data
        })
    }catch(err){
        res.send({msg: `服务器错误:${err}`,status: -1})
    }
}