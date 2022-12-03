// 修改用户基本资料
module.exports = (d)=>{
    return `UPDATE users SET nickname='${d.nickname}',introduce='${d.introduce}' WHERE account_number='${d.account_number}';`
}