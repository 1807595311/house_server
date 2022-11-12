// 获取动态详情

module.exports = async (req, res) => {
    // 动态id edit_detail_dynamic
    let dynamicId = Number( req.body.id );
    let account_number = parseToken(req.headers.authorization);
    try{
        db.query(sqlStr.edit_detail_dynamic({id: dynamicId, account_number}), (err, result) => {
            if(err) return res.send({msg: err,status: -1});
            if(result.length > 0){
                let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
                let data  = {
                    ...result[0],
                    cover: fileUrl + result[0].cover,
                    tags: result[0].tags?result[0].tags.split(','):[]
                }
                res.send({
                    msg: '获取动态详情成功', 
                    status: 2,
                    data
                })
            }
        })

    }catch(err){
        res.send({msg: `服务器错误:${err}`, status: -1})
    }
}