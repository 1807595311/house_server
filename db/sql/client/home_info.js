module.exports = {
    recommendCaseFn: `
    SELECT d.id,
    d.title,
    d.views,
    d.cover 
    FROM DYNAMIC AS d
    INNER JOIN users AS u ON u.account_number=d.account_number AND u.state=1
    WHERE d.is_delete = 1 
    ORDER BY views DESC LIMIT 20;`,
    banner: `SELECT d.id,d.title,d.cover
    FROM DYNAMIC AS d
    INNER JOIN users AS u ON u.account_number = d.account_number AND u.state=1
    WHERE d.is_delete=1
    ORDER BY d.create_time DESC
    LIMIT 0,6;`,
    recommendDesign: `SELECT
    d.id,
    u.account_number,
    u.nickname,
    i.head_img
    FROM des_user AS d
    INNER JOIN users AS u
        ON d.account_number = u.account_number
    INNER JOIN images AS i
        ON i.id = u.headimg
    WHERE u.state = 1
    ORDER BY d.establish_time ASC
    LIMIT 0,8;`
}