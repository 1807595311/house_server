module.exports = async (req, res) => {
    try{
        let data = req.body;
        let pageSize = 20 * data.currentPage;
        let currentPage = pageSize - 20;
        let newData = {}
        for (const k in data) {
            if(!data[k]) newData[k] = '';
        };
        db.query(sqlStr.search_dynamic({...data,currentPage}), (err, result) => {
            if(err) return res.send({msg: err,status: -1});
            if(result[0].length > 0){
                let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
                result[0].forEach(v => v.cover = fileUrl + v.cover );
            }
            return res.send({
                msg: '搜索完毕',
                status: 2,
                data: result[0],
                count: result[1][0].counts
            })
        })
    }catch(err){

    }
}