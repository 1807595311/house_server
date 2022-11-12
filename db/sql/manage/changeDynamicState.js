module.exports = (d)=>{
    return `UPDATE dynamic SET is_delete=${d.is_delete} WHERE id='${d.id}'`;
}