// 查询用户资料
module.exports =(d)=>{
    return {
        info: `SELECT
        u.id,
        u.account_number,
        u.sex,
        u.nickname,
        (SELECT img.head_img FROM images AS img WHERE img.id = u.headimg) AS head_img,
        (SELECT COUNT(f.id) FROM follows AS f WHERE f.account_number = u.account_number) AS follows,
        (SELECT COUNT(f.id) FROM follows AS f WHERE f.f_account_number = u.account_number) AS fans,
        u.introduce,
        u.customer_type,
        u.create_time
        FROM users AS u
        WHERE u.account_number = '${d.account_number}' AND u.state = 1;`,
        des: `SELECT 
        d.mechanism_name,
        d.city,
        d.establish_time
        FROM des_user AS d
        WHERE d.account_number = '${d.account_number}';`,
        ord: `SELECT
        o.phone_number,
        o.wx_number,
        o.qq_number
        FROM ord_user AS o
        WHERE o.account_number = '${d.account_number}';`
    }
}