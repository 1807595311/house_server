// 搜索用户
module.exports = async (req, res) => {
    try{
        let keyword = req.query.keyword;
        let type = req.query.type;
        db.query(sqlStr.search_users({keyword,type}), (err, result) => {
            if(err) return res.send({msg: err,status: -1});
            if(result.length > 0){
                let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
                result.forEach(v => v.headimg = fileUrl + v.headimg );
            }
            return res.send({
                msg: '搜索完毕',
                status: 2,
                data: result
            })
        })
    }catch(err){

    }
}