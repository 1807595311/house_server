module.exports = {
    recommendCaseFn: `SELECT id,title,views,cover FROM DYNAMIC WHERE is_delete = 1 ORDER BY views DESC LIMIT 20;`
    
}