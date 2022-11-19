module.exports = (d)=> {
    if(d.type == 0){
        return `
            SELECT u.id,
            u.nickname,
            u.account_number,
            u.introduce,
            (SELECT img.head_img FROM images AS img WHERE u.headimg=img.id) AS headimg,
            d.city,
            d.establish_time,
            d.mechanism_name
            FROM des_user AS d
            INNER JOIN users AS u ON u.nickname LIKE '%${d.keyword}%' OR
                d.account_number LIKE '%${d.keyword}%' OR
                d.mechanism_name LIKE '%${d.keyword}%'
            WHERE u.account_number = d.account_number AND u.state=1;
        `
    }else if(d.type == 1){
        return `
            SELECT u.id,
	            u.nickname,
	            u.account_number,
	            u.introduce,
	            (SELECT img.head_img FROM images AS img WHERE u.headimg=img.id) AS headimg
            FROM ord_user AS o
            INNER JOIN users AS u ON 
            	u.nickname LIKE '%${d.keyword}%' OR
            	o.account_number LIKE '%${d.keyword}%'
            WHERE u.account_number = o.account_number AND u.state=1;`
    }
}