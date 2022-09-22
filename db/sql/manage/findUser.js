module.exports = (u)=>{
    return `select * from users where account_number='${u.account_number}'`;
}