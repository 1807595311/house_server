module.exports = (u)=>{
    return `SELECT 
        id,account_number,sex,nickname,headimg,introduce,state,disable_reason,customer_type,create_time
     FROM users WHERE account_number='${u.account_number}' AND (customer_type = 1 OR customer_type=0);`
}