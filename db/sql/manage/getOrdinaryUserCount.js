module.exports = (d)=>{
    let account_number = d.account_number ? d.account_number : '';
    let nickname = d.nickname ? d.nickname : '';
    return `SELECT u.id,u.account_number
    FROM users AS u 
	JOIN ord_user AS o_u 
	ON o_u.account_number=u.account_number
    WHERE (${d.state == 2 ? '' : `u.state=${d.state} AND ` }u.account_number LIKE '%${account_number}%' AND u.customer_type=0 AND u.nickname LIKE '%${nickname}%')
    ;`
}