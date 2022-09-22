module.exports = (d)=>{
    return `UPDATE users SET state=${d.state} WHERE account_number='${d.account_number}'`;
}