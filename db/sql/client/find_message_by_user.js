module.exports = (d)=>{
    return {
        follows: `SELECT 
                    f.id,
                    (SELECT u.nickname FROM users AS u WHERE u.account_number = f.account_number) AS u_nickname,
                    (SELECT img.head_img FROM images AS img WHERE img.id = u.headimg) AS head_img,
                    f.account_number,
                    f.create_time
                    FROM follows AS f
                    INNER JOIN users AS u ON f.account_number = u.account_number and u.state = 1
                    WHERE f.f_account_number = '${d.account_number}' ORDER BY f.create_time DESC;`,
        collection: `SELECT
                    c.id,
                    c.dynamic_id,
                    (SELECT d.title FROM DYNAMIC AS d WHERE d.id = c.dynamic_id) AS title,
                    c.account_number,
                    c.create_time,
                    (SELECT u.nickname FROM users AS u WHERE u.account_number = c.account_number) AS t_nickname,
                    (SELECT img.head_img FROM images AS img WHERE img.id = u.headimg) AS head_img
                    FROM DYNAMIC AS d
                    INNER JOIN collection AS c ON c.dynamic_id = d.id
                    INNER JOIN users AS u ON u.account_number = c.account_number and u.state = 1
                    WHERE d.account_number='${d.account_number}' ORDER BY c.create_time DESC;`,
        fabulous: `SELECT
                    f.id,
                    f.dynamic_id,
                    (SELECT d.title FROM DYNAMIC AS d WHERE d.id = f.dynamic_id) AS title,
                    f.account_number,
                    f.create_time,
                    (SELECT u.nickname FROM users AS u WHERE u.account_number = f.account_number) AS t_nickname,
                    (SELECT img.head_img FROM images AS img WHERE img.id = u.headimg) AS head_img
                    FROM DYNAMIC AS d
                    INNER JOIN fabulous AS f ON f.dynamic_id = d.id
                    INNER JOIN users AS u ON u.account_number = f.account_number and u.state = 1
                    WHERE d.account_number='${d.account_number}' ORDER BY f.create_time DESC;`,
        commentReply: `SELECT 
                        c.id,
                        c.dynamic_id,
                        c.account_number,
                        c.to_account_number,
                        c.content,
                        u.nickname,
                        (SELECT img.head_img FROM images AS img WHERE img.id = u.headimg) AS head_img,
                        (SELECT d.title FROM DYNAMIC AS d WHERE d.id = c.dynamic_id) AS title,
                        c.create_time
                        FROM COMMENT AS c
                        INNER JOIN users AS u ON u.account_number=c.account_number AND u.state=1
                        INNER JOIN users AS us ON us.account_number=c.to_account_number AND us.state=1
                        WHERE c.to_account_number = '${d.account_number}' AND c.is_delete=1 ORDER BY c.create_time DESC;`,
        systemNotice: `SELECT 
                        d.id,
                        d.title,
                        d.is_delete,
                        d.delete_reason,
                        d.delete_time
                        FROM DYNAMIC AS d
                        WHERE d.account_number = '${d.account_number}' 
                        AND d.is_delete = 0 
                        AND d.delete_reason IS NOT NULL
                        ORDER BY d.delete_time DESC;`
    }
}