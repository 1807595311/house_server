// 获取动态评论

// 转成树形结构数据
function arrToTree(list) {
    // 定义最终需要返回的树形结构数据
    let treeData = []
    // 对传入的数组进行遍历
    list.forEach(item => {
        // 如果pid没有值,那就是顶级对象,直接添加进数组
        if (!item.a_id) {
            treeData.push(item)
        }
        // 理解为二次遍历 ：每个对象都找一遍自己的孩子添加到children
        let objList = list.filter(data => data.a_id === item.id)
        if (objList.length) {
            item.children = objList
        }
    })
    return treeData
}
module.exports = async (req, res) => {
    try {
        let sqlData = { dynamic_id: req.query.id };
        db.query(sqlStr.find_comment_by_dynamic(sqlData), (err, result) => {
            if (err) return res.send({ msg: err, status: -1 });
            let newResult = [];
            if (result.length > 0) {
                let fileUrl = `${config.serverOptions.host}:${config.serverOptions.port}${config.virtualPath.url}`;
                result.forEach(v=>{
                    if (v.t_head_img) v.t_head_img = fileUrl + v.t_head_img;
                    v.head_img = fileUrl + v.head_img;
                })
                newResult = arrToTree(result);
            }
            return res.send({
                msg: '获取评论成功',
                status: 2,
                data: newResult
            })
        })
    } catch (err) {
        res.send({ msg: err, status: -1 });
    }
}