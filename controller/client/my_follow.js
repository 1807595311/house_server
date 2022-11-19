module.exports = async (req, res) => {
    let account_number = parseToken(req.headers.authorization);
    try{
        await db.query(sqlStr.find_follow_by_account( {account_number} ), (err, result) => {
           if(err) return  res.send({msg: err,status: -1});
           let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
           result.forEach(v => v.headimg = fileUrl + v.headimg);
           res.send({
            msg: '获取我的关注列表成功',
            status: 2,
            data: result
           })
        })
    }catch(err){
        res.send({msg: err,status: -1});
    }
}