module.exports = (d)=>{
    return `UPDATE users SET state=${d.state},disable_reason='${d.disable_reason}' WHERE account_number='${d.account_number}'`;
}