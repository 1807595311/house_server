// 普通用户列表
module.exports = (req, res) => {
    let data = req.query;
    let pageSize = data.pageSize * data.currentPage;
    let currentPage = pageSize - data.pageSize;
    // data.pageSize = pageSize;
    data.currentPage = currentPage;

    let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
    let formatFileUrl = (arr)=>{
        arr.forEach(v => v.head_img = fileUrl + v.head_img);
        return arr;
    }
    // 查询普通用户
    db.query(sqlStr.getOrdinaryUserList({...data ,pageSize: data.pageSize}), (err, result) => {
        if(err) return res.send({ msg: err, status: -1 });
        // 查询普通用户当前状态的总数量
        db.query(sqlStr.getOrdinaryUserCount(data), (er, resu) => {
            if(er) return res.send({ msg: er, status: -1 });
            result.forEach(v=>{
                if(v.sex == 0) v.sex = '女'
                else if(v.sex == 1) v.sex = '男'
                else  v.sex = '未知'
            })
            let sendData = {
                count: resu.length,
                data: formatFileUrl(result),
                status: 2
            };
            res.send(sendData);
        })
    });
};
