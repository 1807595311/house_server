module.exports = (u) => {
    return `SELECT dy.id,dy.account_number,dy.title,dy.cover,dy.views,dy.is_delete FROM 
    DYNAMIC AS dy
    INNER JOIN users AS u ON u.account_number = dy.account_number
    AND u.account_number = '${u.account_number}';`
}