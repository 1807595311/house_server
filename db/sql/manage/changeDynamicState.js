// 动态下架，以及管理员下架动态及原因
module.exports = (d)=>{
    let delete_reason = '';
    if(d.delete_reason) delete_reason = `,delete_reason='${d.delete_reason}',delete_time=now()`;
    return `UPDATE dynamic SET is_delete=${d.is_delete} ${delete_reason} WHERE id='${d.id}'`;
}