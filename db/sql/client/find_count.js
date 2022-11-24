// 查询动态的评论数，点赞数，收藏数
module.exports = (data) => {
    return `SELECT COUNT(id) AS collection_count FROM collection WHERE dynamic_id = ${data.id};
    SELECT COUNT(id) AS fabulous_count FROM fabulous WHERE dynamic_id = ${data.id};
    SELECT COUNT(id) AS comment_count FROM COMMENT WHERE dynamic_id = ${data.id} AND is_delete = 1;
    SELECT COUNT(id) AS follows_count FROM follows WHERE f_account_number = '${data.account_number}';
    SELECT COUNT(id) AS follow_to_count FROM follows WHERE account_number = '${data.account_number}';`
}