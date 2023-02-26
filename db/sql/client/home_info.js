module.exports = {
    recommendCaseFn: `
        SELECT d.id,
        d.title,
        d.views,
        d.cover,
        (SELECT COUNT(f.id) FROM fabulous AS f WHERE f.dynamic_id = d.id) AS fabulous
        FROM DYNAMIC AS d
        INNER JOIN users AS u ON u.account_number=d.account_number AND u.state=1
        WHERE d.is_delete = 1 
        ORDER BY fabulous DESC
        LIMIT 20;`,
    banner: `
        SELECT d.id,
        d.title,
        d.cover,
        (SELECT COUNT(f.id) FROM fabulous AS f WHERE f.dynamic_id = d.id) AS fabulous
        FROM DYNAMIC AS d
        INNER JOIN users AS u ON u.account_number = d.account_number AND u.state=1
        WHERE d.is_delete=1
        ORDER BY fabulous DESC
        LIMIT 0,6;`,
    recommendDesign: `
        SELECT
        d.id,
        u.account_number,
        u.nickname,
        (SELECT img.head_img FROM images AS img WHERE u.headimg = img.id) AS head_img,
        (SELECT COUNT(f.id) FROM follows AS f WHERE f.f_account_number = d.account_number) AS fans_num
        FROM des_user AS d
        INNER JOIN users AS u
            ON d.account_number = u.account_number
        WHERE u.state = 1
        ORDER BY fans_num DESC
        LIMIT 0,8;`
}