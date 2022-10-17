module.exports = (u)=>{
    return `select id,account_number,sex,nickname,headimg,introduce,state,customer_type,create_time
    from users where account_number='${u.account_number}'`;
}