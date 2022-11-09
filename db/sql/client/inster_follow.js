module.exports = (data) => {
    return `INSERT INTO follows (account_number,f_account_number) VALUES ('${data.account_number}','${data.f_account_number}');`;
}