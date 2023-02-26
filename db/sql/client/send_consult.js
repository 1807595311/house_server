module.exports = (d)=> {
    return `INSERT INTO consult(
            account_number,
            to_account_number,
            house_id,
            phone_number,
            wx_number,
            qq_number
        ) 
        VALUES(
            '${d.account_number}',
            '${d.to_account_number}',
            ${d.house_id},
            '${d.phone_number}',
            '${d.wx_number?d.wx_number:''}',
            '${d.qq_number?d.qq_number:''}'
        );`
}
