module.exports = (data) => {
    return `DELETE FROM follows WHERE account_number='${data.account_number}' AND f_account_number='${data.f_account_number}';`;
}