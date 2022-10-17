module.exports = async (req, res) => {
    // 查询推荐案例
    let recommendCase = new Promise((resolve, reject) => {
        db.query(sqlStr.home_info.recommendCaseFn, (err, result) => {
            resolve(result);
        })
    })
    let result = await Promise.all([recommendCase]);
    let recommended_cases = result[0];
    await recommended_cases.forEach(item => {
        item.cover = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}${item.cover}`
    });
    await res.send({
        msg: '获取首页数据成功',
        status: 2,
        data:{
            recommended_cases
        }
    })
}