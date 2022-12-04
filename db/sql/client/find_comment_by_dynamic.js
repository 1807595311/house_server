// 通过动态id查询该动态下的评论
module.exports = (d)=>{
    return `
    SELECT 
    c.id,
    c.dynamic_id,
    c.account_number,
    c.to_account_number,
    c.a_id,
    c.p_id,
    c.content,
    u.nickname AS f_nickname,
    us.nickname AS t_nickname,
    (SELECT img.head_img FROM images AS img WHERE img.id = u.headimg) AS head_img,
    (SELECT img.head_img FROM images AS img WHERE img.id = us.headimg) AS t_head_img,
    c.create_time
    FROM COMMENT AS c
    LEFT JOIN users AS u ON u.account_number=c.account_number
    LEFT JOIN users AS us ON us.account_number=c.to_account_number
    INNER JOIN users AS uu ON c.account_number=uu.account_number AND uu.state=1
    WHERE c.dynamic_id=${d.dynamic_id} AND c.is_delete=1;`
}