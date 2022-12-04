module.exports = (data) => {
    return `
    SELECT 
        u.id,
        u.account_number,
        u.nickname,
        u.introduce,
        u.customer_type,
        u.state,
        (SELECT img.head_img FROM images AS img WHERE img.id = u.headimg) AS head_img,
        (SELECT COUNT(d.id) FROM DYNAMIC AS d WHERE d.account_number = u.account_number) AS dynamic_count,
        (SELECT COUNT(f.id) FROM follows AS f WHERE f.f_account_number = u.account_number) AS follows_count,
        (SELECT COUNT(f.id) FROM follows AS f WHERE f.f_account_number = u.account_number AND f.account_number = '${data.account_number}') AS is_follows
    FROM users AS u
    WHERE u.account_number = '${data.from_account_number}';`;
}
