module.exports = (u) => {
    return `SELECT d.id,f.create_time,d.title,d.cover,d.views
    FROM fabulous AS f
    INNER JOIN DYNAMIC AS d ON f.dynamic_id = d.id
    WHERE f.account_number='${u.account_number}' LIMIT ${u.currentPage},${u.pageSize};`
}