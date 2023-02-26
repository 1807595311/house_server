module.exports = (u) => {
    return `SELECT d.id,c.create_time,d.title,d.cover,d.views,d.create_time
    FROM collection AS c
    INNER JOIN DYNAMIC AS d ON c.dynamic_id = d.id
    INNER JOIN users AS u ON d.account_number=u.account_number AND u.state = 1
    WHERE c.account_number='${u.account_number}'
    ${u.sort ? `ORDER BY d.create_time ${u.sort}` : ''} 
    LIMIT ${u.currentPage},20;

    SELECT count(d.id) as counts
    FROM collection AS c
    INNER JOIN DYNAMIC AS d ON c.dynamic_id = d.id
    INNER JOIN users AS u ON d.account_number=u.account_number AND u.state = 1
    WHERE c.account_number='${u.account_number}';`
}