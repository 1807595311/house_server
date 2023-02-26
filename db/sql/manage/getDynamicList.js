// 查询动态列表
module.exports = (data) => {
  let account_number = data.account_number ? data.account_number : "";
  let title = data.title ? data.title : "";
  return `
  SELECT
  d.id,
  d.account_number,
  d.title,
  d.content,
  d.cover,
  d.tags,
  d.views,
  (SELECT COUNT(id) FROM collection WHERE dynamic_id = d.id) AS collection_count,
  (SELECT COUNT(id) FROM fabulous WHERE dynamic_id = d.id) AS fabulous_count,
  d.is_delete,
  d.create_time
  FROM
    DYNAMIC AS d
  WHERE ${data.is_delete == 2 ? "" : `d.is_delete=${data.is_delete} AND `}
    ${!account_number ? "" : `d.account_number = '${account_number}' AND `}
    d.title LIKE '%${title}%'
  ORDER BY d.create_time DESC
  LIMIT ${data.currentPage},${data.pageSize};`
};
