module.exports = (u) => {
    return `SELECT d.id,f.create_time,d.title,d.cover,d.views
    FROM collection AS f
    INNER JOIN DYNAMIC AS d ON f.dynamic_id = d.id
    INNER JOIN users AS u ON d.account_number=u.account_number AND u.state = 1
    WHERE f.account_number='${u.account_number}' LIMIT ${u.currentPage},${u.pageSize};`
}