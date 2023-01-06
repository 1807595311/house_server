// 删除
module.exports = (d) => {
    return {
        des: `UPDATE consult AS c SET c.des_delete = 1 WHERE c.id = ${d.id} AND c.to_account_number = '${d.account_number}';`,
        ord: `UPDATE consult AS c SET c.ord_delete = 1 WHERE c.id = ${d.id} AND c.account_number = '${d.account_number}';`
    }
}