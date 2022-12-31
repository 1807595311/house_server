// 查看其他用户资料
module.exports = async (req, res) => {
    try{
        let data = {
            from_account_number: req.body.account_number,
            account_number: parseToken(req.headers.authorization)
        }
        let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
        // 封装查询 普通用户 或 设计机构 的资料
        const getAccountInfo = (type)=>{
            return new Promise((resolve, reject) => {
                db.query(sqlStr.find_user_info({account_number: data.from_account_number})[type], (err, result) => {
                    if (err) return res.send({ msg: err, status: -1 });
                    resolve(result[0]);
                })
            })
        }
        // 通过账号查询用户的粉丝数，作品数，昵称，头像，个人简介  用户详情
        let getUserInfo = new Promise((resolve, reject) => {
            db.query(sqlStr.find_other_userinfo(data), async (err, result) => {
                result[0].is_follows = result[0].is_follows > 0 ? true : false;
                result[0].head_img = fileUrl + result[0].head_img;
                let customer_type = result[0].customer_type;
                let otherUserInfo = customer_type == 1 ? await getAccountInfo('des') : null;
                await resolve({...result[0],...otherUserInfo});
            })
        })
        // 通过账号查询发布的动态
        let getDynamicListByaccount = new Promise((resolve, reject) => {
            db.query(sqlStr.find_dynamic_by_userinfo(data), (err, result) => {
                result.forEach(v => v.cover = fileUrl + v.cover);
                resolve(result);
            })
        })
        let result = await Promise.all( [getUserInfo,getDynamicListByaccount] );
        await res.send({
            msg: '获取用户数据成功',
            status: 2,
            data:{
                userInfo: result[0],
                dynamicList: result[1]
            }
        })
    }catch(err){
        res.send({msg: `服务器错误:${err}`,status: -1})
    }
}