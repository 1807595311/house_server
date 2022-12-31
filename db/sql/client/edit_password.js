// 修改用户头像
module.exports = (d) => {
    return `UPDATE users SET password='${d.password}' WHERE account_number='${d.account_number}';`;
}
