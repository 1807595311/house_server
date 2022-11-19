// 查询我的关注
module.exports = (data) => {
    return `
    SELECT f.id,
    	(SELECT us.nickname FROM users AS us WHERE us.account_number = f.f_account_number) AS nickname,
    	(
    		SELECT img.head_img FROM images AS img WHERE img.id = (SELECT us.headimg FROM users AS us WHERE us.account_number = f.f_account_number)
    	) AS headimg,
    	f.f_account_number,
    	(SELECT us.introduce FROM users AS us WHERE us.account_number = f.f_account_number) AS introduce
    FROM follows AS f
    INNER JOIN users AS u ON
    	f.account_number = '${data.account_number}'
    WHERE u.account_number = f.account_number;`;
  };