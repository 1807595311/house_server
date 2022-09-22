const mysql = require('mysql');
const escape = mysql.escape; // 防止sql注入 将 -- 转义
module.exports = (u)=>{
    let account_number = escape(u.account_number);
    let password = escape(u.password);
    return `select * from users where account_number=${account_number} and password=${password} and customer_type=2`
}