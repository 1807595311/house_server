// 修改用户头像
module.exports = (d) => {
    return `UPDATE users SET state='0' WHERE account_number='${d.account_number}';`;
}
