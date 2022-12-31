module.exports = (d)=> {
    return `
    SELECT dy.id,dy.title,dy.views,dy.style,dy.cover
    FROM DYNAMIC AS dy
    INNER JOIN users AS u ON u.nickname LIKE '%${d.keyword}%' 
    	OR dy.title LIKE '%${d.keyword}%' 
    	OR dy.tags LIKE '%${d.keyword}%'
    WHERE dy.account_number=u.account_number AND dy.is_delete=1;
    `
}