module.exports = (u)=>{
    return `select id,mechanism_name,city,establish_time from des_user where account_number='${u.account_number}'`;
}