module.exports = (data) => {
    // 查询某动态是否被某用户点赞
    return `SELECT * FROM fabulous WHERE account_number='${data.account_number}' AND dynamic_id=${data.dynamic_id};`
}