module.exports = (data) => {
    return `DELETE FROM fabulous WHERE account_number='${data.account_number}' AND dynamic_id=${data.dynamic_id};`;
}