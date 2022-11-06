module.exports = async (req, res) => {
    let account_number = parseToken(req.headers.authorization);
    try{
        await db.query(sqlStr.find_my_dynamic({account_number}), (err, result) => {
           if(err) return  res.send({msg: err,status: -1});
           let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
           result.forEach(v => v.cover = fileUrl + v.cover);
           let published = result.filter(v=> v.is_delete == 1);
           let offshelf = result.filter(v=> v.is_delete == 0);
           res.send({
            msg: '获取我的动态成功',
            status: 2,
            data: {
                published,
                offshelf
            }
           })
        })
    }catch(err){
        res.send({msg: err,status: -1});
    }
}