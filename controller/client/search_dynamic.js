module.exports = async (req, res) => {
    try{
        let keyword = req.query.keyword;
        db.query(sqlStr.search_dynamic({keyword}), (err, result) => {
            if(err) return res.send({msg: err,status: -1});
            if(result.length > 0){
                let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
                result.forEach(v => v.cover = fileUrl + v.cover );
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