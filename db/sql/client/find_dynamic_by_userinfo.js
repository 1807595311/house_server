module.exports = (data)=>{
    return `
    SELECT
	d.id,
	d.title,
	d.cover,
	d.views,
	d.create_time
	FROM DYNAMIC AS d
	INNER JOIN users AS u ON u.account_number = d.account_number AND u.state = 1
	WHERE d.account_number = '${data.from_account_number}' AND d.is_delete = 1
	ORDER BY d.create_time DESC
	LIMIT ${data.currentPage},20;

	SELECT
	count(d.id) as counts
	FROM DYNAMIC AS d
	INNER JOIN users AS u ON u.account_number = d.account_number AND u.state = 1
	WHERE d.account_number = '${data.from_account_number}' AND d.is_delete = 1;`;
}