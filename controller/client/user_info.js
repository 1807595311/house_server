// 个人资料
module.exports = (req, res) => {
    // 解决查询字符串格式的日期自动转换成UTC格式问题
    let formatDate = (date)=>{
        let newDate = new Date(date);
        let y = newDate.getFullYear();
        let m = newDate.getMonth() + 1;
        let d = newDate.getDate();
        if( m < 10 ) m = '0' + m;
        if( d < 10 ) d = '0' + d;
        return `${y}-${m}-${d}`;
    }
    try {
        let account_number = parseToken(req.headers.authorization);
        let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
        // 封装查询普通用户或设计机构的资料
        const getAccountInfo = (type)=>{
            return new Promise((resolve, reject) => {
                db.query(sqlStr.find_user_info({ account_number })[type], (err, result) => {
                    if (err) return res.send({ msg: err, status: -1 });
                    if (result.length > 0) resolve(result[0]);
                })
            })
        }
        db.query(sqlStr.find_user_info({ account_number }).info, async (err, result) => {
            if (err) return res.send({ msg: err, status: -1 });
            if (result.length > 0) {
                let type = Number( result[0].customer_type );
                result[0].head_img = fileUrl + result[0].head_img;
                let info = type === 0 ? await getAccountInfo('ord') : type === 1 ? await getAccountInfo('des') : null;
                info.establish_time = formatDate(info.establish_time);
                res.send({
                    msg: '获取个人资料成功',
                    status: 2,
                    data: {...result[0] ,...info}
                })
            }else{
                res.send({
                    msg: '获取个人资料失败',
                    status: -1,
                    data: null
                })
            }
        })
    } catch (err) {
        res.send({ msg: `服务器错误:${err}`, status: -1 })
    }
}