module.exports = (d) => {
    return {
        insert: `INSERT INTO house_info (account_number,title,city,style,area,situation,budget,planned_time) 
                VALUES (
                    '${d.account_number}',
                    '${d.title}',
                    '${d.city}',
                    ${d.style},
                    ${d.area},
                    '${d.situation}',
                    ${d.budget},
                    '${d.planned_time}'
                );`,
        update: `
            UPDATE house_info SET
            title = '${d.title}',
            city = '${d.city}',
            style = ${d.style},
            area = ${d.area},
            situation = '${d.situation}',
            budget = ${d.budget},
            planned_time = '${d.planned_time}'
            WHERE id = ${d.id}
            AND account_number = '${d.account_number}';
        `
    }

}