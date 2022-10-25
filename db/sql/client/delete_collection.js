module.exports = (data) => {
    return `DELETE FROM collection WHERE account_number='${data.account_number}' AND dynamic_id=${data.dynamic_id};`;
}