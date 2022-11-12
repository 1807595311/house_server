// 通过动态查询是否关注该用户
module.exports = (data) => {
  return `
    SELECT * FROM follows AS f
WHERE f.account_number = '${data.account_number}' AND f.f_account_number=
(SELECT d.account_number
FROM DYNAMIC AS d
WHERE d.id=${data.id})`;
};
