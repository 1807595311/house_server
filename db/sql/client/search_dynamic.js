module.exports = (d)=> {
    return `
    SELECT dy.id,dy.title,dy.views,dy.style,dy.city,dy.cover,dy.create_time,
    (SELECT COUNT(c.id) FROM collection AS c WHERE c.dynamic_id=dy.id) AS collection_count,
    (SELECT COUNT(f.id) FROM fabulous AS f WHERE f.dynamic_id=dy.id) AS fabulous_count
    FROM DYNAMIC AS dy
    WHERE dy.is_delete=1 AND
    ( dy.title LIKE '%${d.keyword}%') AND
    dy.city LIKE '%${d.city}%' AND 
    dy.tags LIKE '%${d.tags}%' 
    ${d.style ? `AND dy.style = ${d.style}`:''}
    ORDER BY ${d.sort} ${d.order}
    LIMIT ${d.currentPage},20;

    SELECT COUNT(id) as counts FROM DYNAMIC AS dy WHERE dy.is_delete=1 AND
    ( dy.title LIKE '%${d.keyword}%') AND
    dy.city LIKE '%${d.city}%' AND 
    dy.tags LIKE '%${d.tags}%' 
    ${d.style ? `AND dy.style = ${d.style}`:''};`
}