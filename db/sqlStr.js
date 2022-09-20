const mysql = require('mysql');
const escape = mysql.escape; // 防止sql注入 将 -- 转义

const insertImagesStr = `insert into images (head_img) values (?)`;
const insertUsersStr = function (u) {
    return `insert into users (account_number,password,sex,nickname,headimg,introduce,customer_type) 
    values ('${u.account_number}','${u.password}',${u.sex},'${u.nickname}',${u.headimg},'${u.introduce}',${u.customer_type})`;
}
const findUser = function (u) {
    return `select * from users where account_number='${u.account_number}'`;
}
const manage_login = function (u) {
    let account_number = escape(u.account_number);
    let password = escape(u.password);
    return `select * from users where account_number=${account_number} and password=${password} and customer_type=2`
}
const find_headImg_url = function () {
    return `select * from images where id=1`
}
const find_ordinary_users_home_page = function (d) {
    let account_number = d.account_number ? d.account_number : '';
    let nickname = d.nickname ? d.nickname : '';
    return `SELECT u.id,u.account_number,u.sex,u.nickname,u.introduce,u.state,u.create_time,o_u.phone_number,o_u.wx_number,o_u.qq_number 
    FROM users AS u 
	JOIN ord_user AS o_u 
	ON o_u.account_number=u.account_number
    WHERE (${d.state == 2 ? '' : `u.state=${d.state} AND ` }u.account_number LIKE '%${account_number}%' AND u.nickname LIKE '%${nickname}%')
    LIMIT ${d.currentPage},${d.pageSize};`
}
module.exports = {
    insertImagesStr,// 插入图片
    insertUsersStr,// 插入用户
    findUser, // 查找用户
    manage_login, // 管理员登录
    find_headImg_url, // 查找用户头像
    find_ordinary_users_home_page // 查询普通用户
}