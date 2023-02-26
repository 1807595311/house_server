// 比对用户密码
module.exports = (d) => {
    return `SELECT id,password FROM users 
    WHERE account_number='jzzh199008' AND 
    PASSWORD='${d.password}' 
    AND state = 1;`;
}
