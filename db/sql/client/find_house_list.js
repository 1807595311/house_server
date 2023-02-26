module.exports = (d) => {
    // 查询用户的房屋列表
    return `SELECT 
            id,
            account_number,
            title,
            city,
            (SELECT s.name FROM ren_style AS s WHERE s.id = style) AS style,
            area,
            situation,
            budget,
            planned_time,
            create_time
            FROM house_info
            WHERE account_number = '${d.account_number}' 
            AND is_delete = 1;`
}