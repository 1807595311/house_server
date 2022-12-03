// 修改设计机构资料和普通用户资料
module.exports = (d)=> {
    return {
        ord: `UPDATE ord_user SET 
        phone_number='${d.phone_number}',
        wx_number='${d.wx_number}',
        qq_number='${d.qq_number}' 
        WHERE account_number='${d.account_number}';`,

        des: `UPDATE des_user SET 
        mechanism_name='${d.mechanism_name}',
        city='${d.city}',
        establish_time='${d.establish_time}' 
        WHERE account_number='${d.account_number}';`
    }
}