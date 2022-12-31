module.exports = (u) => {
    return `SELECT 
    dy.id,
    dy.title,
    dy.account_number,
    dy.content_md,
    dy.content,
    dy.tags,
    dy.style,
    dy.cover
    FROM DYNAMIC AS dy 
    WHERE id = ${u.id} AND account_number = '${u.account_number}';`
}