const mysql = require('mysql');
const escape = mysql.escape; // 防止sql注入 将 -- 转义

const insertImagesStr = `insert into images (head_img) values (?)`;
const insertUsersStr = function (u) {
    return `insert into users (account_number,password,sex,nickname,headimg,introduce,customer_type) 
    values ('${u.account_number}','${u.password}',${u.sex},'${u.nickname}',${u.headimg},'${u.introduce}',${u.customer_type})`;
}
const findUser = function(u){
    return `select * from users where account_number='${u.account_number}'`;
}
const manage_login = function (u){
    let account_number = escape(u.account_number);
    let password = escape(u.password);
    return `select * from users where account_number=${account_number} and password=${password} and customer_type=2`
}
const find_headImg_url = function (){
    return `select * from images where id=1`
}
module.exports = {
    insertImagesStr,// 插入图片
    insertUsersStr,// 插入用户
    findUser, // 查找用户
    manage_login, // 管理员登录
    find_headImg_url // 查找用户头像
}