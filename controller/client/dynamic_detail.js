// 获取动态详情

module.exports = async (req, res) => {
    // 动态id
    let dynamicId = Number( req.body.id );
    let account_number = parseToken(req.headers.authorization);
    try{
        let getDynamicDetail = new Promise((resolve, reject) => {
            // 通过动态的用户账号查询资料 update_dynamic_views
            db.query(sqlStr.dynamic_detail(dynamicId), (err, result) => {
                if(err) return res.send({msg:err,status:-1});
                let info = result[0][0];
                let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
                info.cover = fileUrl + info.cover;
                info.head_img = fileUrl + info.head_img;
                // 查询账号对应的其他动态
                db.query(sqlStr.find_dynamic_by_account(info), (err2, result2) => {
                    result2.forEach(v => v.cover = fileUrl + v.cover );
                    let otherDynamicList = result2;
                    info = {...info,otherDynamicList}
                    resolve(info);
                })
            })
        })
        let dynamicDetail = await getDynamicDetail;
        // 查询该动态是否被点赞
        let like = new Promise((resolve, reject) => {
            db.query(sqlStr.find_fabulous({account_number,dynamic_id:dynamicDetail.id }), (err, result) => {
                if(result.length > 0) resolve({is_like: true});
                else resolve({is_like: false});
            })
        })
        // 查询该动态是否被收藏
        let collection = new Promise((resolve, reject) => {
            db.query(sqlStr.find_collection({account_number,dynamic_id:dynamicDetail.id }), (err, result) => {
                if(result.length > 0) resolve({is_collection: true});
                else resolve({is_collection: false});
            })
        })

        Promise.all( [like,collection] ).then(result=>{
            let resData = {...dynamicDetail, ...result[0], ...result[1]}
            res.send({
                msg: '获取动态详情成功', 
                status: 2,
                data: {
                    dynamicDetail: resData
                }
            })
        })


    }catch(err){
        res.send({msg: `服务器错误:${err}`, status: -1})
    }
    

}