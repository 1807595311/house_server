// 查询动态的评论数，点赞数，收藏数
module.exports = (data) => {
    return `SELECT COUNT(id) AS collection_count FROM collection WHERE dynamic_id = ${data.id};
    SELECT COUNT(id) AS fabulous_count FROM fabulous WHERE dynamic_id = ${data.id};
    SELECT COUNT(id) AS comment_count FROM COMMENT WHERE dynamic_id = ${data.id};`
}