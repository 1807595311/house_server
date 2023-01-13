module.exports = (d)=>{
    let account_number = d.account_number ? d.account_number : '';
    let nickname = d.nickname ? d.nickname : '';
    return `SELECT u.id,
    u.account_number,
    u.sex,
    u.nickname,
    u.introduce,
    u.state,
    u.create_time,
    d_u.establish_time,
    d_u.mechanism_name,
    d_u.city,
    (SELECT img.head_img FROM images AS img WHERE u.headimg = img.id) AS head_img,
    (SELECT COUNT(id) FROM follows AS f WHERE f.f_account_number = d_u.account_number) AS fans,
    (SELECT COUNT(id) FROM follows AS f WHERE f.account_number = d_u.account_number) AS follows,
    (SELECT COUNT(id) FROM DYNAMIC AS f WHERE f.account_number = d_u.account_number) AS dynamic_count
    FROM users AS u 
	JOIN des_user AS d_u 
	ON d_u.account_number=u.account_number
    WHERE (${d.state == 2 ? '' : `u.state=${d.state} AND ` }u.account_number LIKE '%${account_number}%' AND u.customer_type=1 AND u.nickname LIKE '%${nickname}%')
    LIMIT ${d.currentPage},${d.pageSize};`
}