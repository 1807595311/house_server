// 修改用户头像
module.exports = (d) => {
    return `UPDATE images 
    SET head_img = '${d.url}'
    WHERE id = (
        SELECT
        u.headimg
        FROM users AS u
        WHERE u.account_number = '${d.account_number}' AND u.state = 1
    );`
}