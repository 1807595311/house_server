module.exports = (data) => {
    // 查询我的咨询
    return {
        ord: `
        SELECT 
        c.id,
        us.nickname AS nickname,
        (SELECT du.mechanism_name FROM des_user AS du WHERE du.account_number = c.to_account_number) AS mechanism_name,
        (SELECT img.head_img FROM images AS img WHERE img.id = us.headimg) AS head_img,
        c.read,
        (SELECT s.name FROM ren_style AS s WHERE s.id = h.style) AS style,
        h.area,
        h.title,
        h.situation,
        h.budget,
        h.planned_time,
        c.phone_number,
        c.wx_number,
        c.qq_number,
        c.create_time
        FROM consult AS c
        INNER JOIN users AS us ON us.account_number = c.to_account_number
        INNER JOIN house_info AS h ON h.id = c.house_id
        WHERE c.account_number = '${data.account_number}' AND c.ord_delete = 0;`,
        des: `
        SELECT 
        c.id,
        uo.nickname,
        (SELECT img.head_img FROM images AS img WHERE img.id = uo.headimg) AS head_img,
        c.read,
        (SELECT s.name FROM ren_style AS s WHERE s.id = h.style) AS style,
        h.area,
        h.title,
        h.situation,
        h.budget,
        h.planned_time,
        c.phone_number,
        c.wx_number,
        c.qq_number,
        c.create_time
        FROM consult AS c
        INNER JOIN users AS uo ON uo.account_number = c.account_number
        INNER JOIN house_info AS h ON h.id = c.house_id
        WHERE c.to_account_number = '${data.account_number}' AND c.des_delete = 0;`
    }
}