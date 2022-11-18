module.exports = async (req, res) => {
    // 格式化图片路径
    function fromatCover(arr,key){
        key = key ? key : 'cover';
        let hostUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
        arr.forEach(item => item[key] = `${hostUrl}${item[key]}`);
    }
    try{
        // 查询推荐动态，按浏览次数排序
        let recommendCase = new Promise((resolve, reject) => {
            db.query(sqlStr.home_info.recommendCaseFn, (err, result) => resolve(result) )
        })
        // banner展示动态，按发布最新日期排序
        let banner = new Promise((resolve, reject) => {
            db.query(sqlStr.home_info.banner, (err, result) => resolve(result) )
        })
        // 推荐设计机构，按机构创立时间排序
        let recommendDesign = new Promise((resolve, reject) => {
            db.query(sqlStr.home_info.recommendDesign, (err, result) => resolve(result) )
        })
        let result = await Promise.all([recommendCase,banner,recommendDesign]);
        let recommended_cases = result[0];
        let banner_cases = result[1];
        let recommend_design = result[2];
        fromatCover(recommended_cases);
        fromatCover(banner_cases);
        fromatCover(recommend_design,'head_img');
        await res.send({
            msg: '获取首页数据成功',
            status: 2,
            data:{
                recommended_cases,
                banner_cases,
                recommend_design
            }
        })
    }catch(err){
        res.send({msg: `服务器错误:${err}`,status: -1})
    }
}