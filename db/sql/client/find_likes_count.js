module.exports = (data) => {
    return `select count(id) as count FROM fabulous WHERE account_number='${data.account_number}';`;
}