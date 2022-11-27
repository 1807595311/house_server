module.exports = (d) => {
    return `UPDATE comment SET is_delete=${d.is_delete} WHERE id=${d.id} AND account_number='${d.account_number}'`;
}