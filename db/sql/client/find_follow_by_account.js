// 查询我的关注
module.exports = (u) => {
    return `
    SELECT f.id,f.create_time,
	(SELECT state FROM users WHERE users.account_number = f.f_account_number) AS state,
	(SELECT us.nickname FROM users AS us WHERE us.account_number = f.f_account_number) AS nickname,
	(SELECT img.head_img FROM images AS img WHERE img.id = (SELECT us.headimg FROM users AS us WHERE us.account_number = f.f_account_number) ) AS headimg,
	(SELECT us.customer_type FROM users AS us WHERE us.account_number = f.f_account_number) AS customer_type,
	f.f_account_number,
	(SELECT us.introduce FROM users AS us WHERE us.account_number = f.f_account_number) AS introduce
    FROM follows AS f
    INNER JOIN users AS u ON
    	f.account_number = '${u.account_number}'
    WHERE u.account_number = f.account_number
    ${u.sort ? `ORDER BY f.create_time ${u.sort}` : ''} 
    LIMIT ${u.currentPage},20;

    SELECT count(f.id) as counts
    FROM follows AS f
    INNER JOIN users AS u ON
    	f.account_number = '${u.account_number}'
    WHERE u.account_number = f.account_number;`;
  };