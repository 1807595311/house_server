module.exports = (req, res) => {
    let data = req.query;
    let pageSize = data.pageSize * data.currentPage;
    let currentPage = pageSize - data.pageSize;
    data.pageSize = pageSize;
    data.currentPage = currentPage;

    db.query(sqlStr.find_ordinary_users_home_page(data), (err, result) => {
        result.forEach(v=>{
            if(v.sex == 0) v.sex = '女'
            else if(v.sex == 1) v.sex = '男'
            else  v.sex = '未知'
        })
        let sendData = {
            count: result.length,
            data: result
        };
        res.send(sendData);
    });
};
