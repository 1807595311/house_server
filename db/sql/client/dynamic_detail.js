module.exports = (id) => {
    return `SELECT dy.id,u.nickname,u.account_number,img.head_img,u.introduce,
                    u.customer_type,dy.title,dy.tags,dy.content,dy.views,dy.cover,dy.create_time
            FROM users AS u
            INNER JOIN images AS img ON u.headimg = img.id
            INNER JOIN dynamic AS dy ON u.account_number = dy.account_number
            WHERE dy.id = ${id};
            UPDATE DYNAMIC SET views=views+1 WHERE id = ${id};
            `
}