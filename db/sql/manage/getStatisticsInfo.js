module.exports = ()=>{
    // 统计查询，查询用户表中 普通用户人数、设计机构人数、性别总人数(不包括未知、2) 、男性总人数、女性总人数、动态总数
    // 查询统计城市设计机构人数
    return `SELECT 
    DISTINCT (SELECT COUNT(account_number) FROM users WHERE users.customer_type=1) AS des_user_count,
    (SELECT COUNT(account_number) FROM users  WHERE users.customer_type=0) AS old_user_count,
    (SELECT COUNT(account_number) FROM users  WHERE users.sex!=2 AND customer_type=0) AS sex_count,
    (SELECT COUNT(account_number) FROM users  WHERE users.sex=1 AND customer_type=0) AS male_count,
    (SELECT COUNT(account_number) FROM users  WHERE users.sex=0 AND customer_type=0) AS female_count,
    (SELECT COUNT(id) FROM DYNAMIC AS dy  WHERE dy.id) AS dynamic_count
    FROM users AS u GROUP BY u.account_number;

    SELECT ${"`value`"},${"`name`"}
    FROM ( SELECT COUNT(id) AS value, city AS name FROM des_user GROUP BY city  ORDER BY VALUE DESC ) 
    AS temp;

    SELECT 
    DISTINCT 
    (SELECT COUNT(f_account_number) FROM follows WHERE follows.f_account_number=u.account_number) AS follows_count,
    u.account_number,
    u.nickname
    FROM users AS u 
    WHERE u.customer_type != 2
    GROUP BY u.account_number 
    ORDER BY follows_count DESC
    LIMIT 0,10;`;
}