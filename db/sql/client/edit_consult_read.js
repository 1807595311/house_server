// 修改咨询已读状态
module.exports = (d) => {
    return `UPDATE consult AS c SET c.read=1 WHERE id=${d.id} AND c.to_account_number = '${d.account_number}';`
}