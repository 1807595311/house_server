module.exports = (id) => {
    return `SELECT id,account_number,title,content,views,cover,update_time FROM DYNAMIC where id=${id};`
}