module.exports = (u)=>{
    return `insert into ord_user (account_number,phone_number,wx_number,qq_number) 
    values ('${u.account_number}','${u.phone_number}','${u.wx_number?u.wx_number:''}','${u.qq_number?u.qq_number:''}')`;
}