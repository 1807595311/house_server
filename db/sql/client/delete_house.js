module.exports = (data) => {
    return `update house_info 
    set is_delete = 0
    WHERE id=${data.id}
    AND account_number='${data.account_number}';`;
}