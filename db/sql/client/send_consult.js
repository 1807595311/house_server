module.exports = (d)=> {
    return `INSERT INTO consult(
        account_number,
        to_account_number,
        city,
        style,
        area,
        situation,
        budget,
        planned_time,
        phone_number,
        wx_number,
        qq_number
        ) 
        VALUES(
        '${d.account_number}',
        '${d.to_account_number}',
        '${d.city}',
        '${d.style_id}',
        ${d.area},
        '${d.situation}',
        ${d.budget},
        '${d.planned_time}',
        '${d.phone_number}',
        '${d.wx_number?d.wx_number:''}',
        '${d.qq_number?d.qq_number:''}'
        );`
}
