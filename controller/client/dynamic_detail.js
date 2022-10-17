// 获取动态详情

module.exports = async (req, res) => {
    // 动态id
    let dynamicId = Number( req.query.id );
    try{
        let getDynamicDetail = new Promise((resolve, reject) => {
            db.query(sqlStr.dynamic_detail(dynamicId), (err, result) => {
                // 通过动态的用户账号查询设计机构资料
                let dynamicDetail = result[0];
                resolve(dynamicDetail);
            })
        })
        let dynamicDetail = await getDynamicDetail;
        let u = dynamicDetail;
        let userInfo = {};

        // 获取发布者的用户信息
        let getUserInfo = new Promise((resolve, reject) => {
            db.query(sqlStr.findUser(u), (err2, result2) => {
                
                // 如果是设计机构则将机构信息返回;find_desuser
                if(userInfo.customer_type == 1){
                    db.query(sqlStr.find_desuser(u), (err3, result3) => {
                        userInfo = { ...result2[0], ...result3[0] };
                        resolve(userInfo);
                    })
                }else {
                    userInfo = {...result2[0]};
                    resolve(userInfo);
                }
            });
        })
        let userData = await getUserInfo;
        res.send(
            {
                msg: '获取动态详情成功', 
                status: 2,
                data: {
                    userData,
                    dynamicDetail
                }
            })
    }catch(err){
        res.send({msg: `服务器错误:${err}`, status: -1})
    }
    

}