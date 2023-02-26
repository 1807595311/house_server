// 修改普通用户和设计机构资料
module.exports = (req,res)=>{
    try{
        let account_number = parseToken(req.headers.authorization);
        let data = req.body;

        // 封装修改 普通用户 或 设计机构 的资料
        const getAccountInfo = (type)=>{
            return new Promise((resolve, reject) => {
                db.query(sqlStr.edit_other_userInfo({ account_number,...data })[type], (err, result) => {
                    if (err) return res.send({ msg: err, status: -1 });
                    resolve(result);
                })
            })
        }
        // 通过用户类型进行修改
        db.query(sqlStr.find_user_info({ account_number }).info, async (err, result) => {
            if (err) return res.send({ msg: '修改失败' + err, status: -1 });
            if (result.length > 0) {
                let type = Number( result[0].customer_type );
                let changeUserInfoResult = type === 0 ? await getAccountInfo('ord') : type === 1 ? await getAccountInfo('des') : null;
                if(changeUserInfoResult.affectedRows === 1) return res.send({ msg: '修改资料成功',status: 0});
            }
        })
    }catch(err){
        res.send({ msg: '修改资料导致服务器错误' + err, status: -1 });
    }
}