module.exports = (data) => {
    // 查询用户联系方式
    return `SELECT phone_number,qq_number,wx_number
    FROM ord_user
    WHERE account_number = '${data.account_number}'`
}