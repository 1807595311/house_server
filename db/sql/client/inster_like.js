module.exports = (data) => {
    return `INSERT INTO fabulous (account_number,dynamic_id) VALUES ('${data.account_number}',${data.dynamic_id});`;
}