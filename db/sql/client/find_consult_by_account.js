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
        c.city,
        (SELECT s.name FROM ren_style AS s WHERE s.id = c.style) AS style,
        c.area,
        c.situation,
        c.budget,
        c.planned_time,
        c.phone_number,
        c.wx_number,
        c.qq_number,
        c.create_time
        FROM consult AS c
        INNER JOIN users AS us ON us.account_number = c.to_account_number
        WHERE c.account_number = '${data.account_number}' AND c.ord_delete = 0;`,
        des: `
        SELECT 
        c.id,
        uo.nickname,
        (SELECT img.head_img FROM images AS img WHERE img.id = uo.headimg) AS head_img,
        c.read,
        c.city,
        (SELECT s.name FROM ren_style AS s WHERE s.id = c.style) AS style,
        c.area,
        c.situation,
        c.budget,
        c.planned_time,
        c.phone_number,
        c.wx_number,
        c.qq_number,
        c.create_time
        FROM consult AS c
        INNER JOIN users AS uo ON uo.account_number = c.account_number
        WHERE c.to_account_number = '${data.account_number}' AND c.des_delete = 0;`
    }
}