module.exports = (data) => {
  let account_number = data.account_number ? data.account_number : "";
  let title = data.title ? data.title : "";
  return `
  SELECT
d.id,
d.account_number,
d.title,
d.content,
d.tags,
d.views,
d.is_delete,
d.create_time
FROM
  DYNAMIC AS d
WHERE ${data.is_delete == 2 ? "" : `d.is_delete=${data.is_delete} AND `}
  ${!account_number ? "" : `d.account_number = '${account_number}' AND `}
  d.title LIKE '%${title}%'
LIMIT ${data.currentPage},${data.pageSize};`
};
