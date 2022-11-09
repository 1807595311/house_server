module.exports = (data) => {
    // 查询某动态是否被某用户点赞
    return `SELECT * FROM follows WHERE account_number='${data.account_number}' AND f_account_number='${data.f_account_number}';`
}