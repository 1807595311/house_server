module.exports = (data)=>{
    return `
    SELECT
	d.id,
	d.title,
	d.cover,
	d.views
FROM DYNAMIC AS d
WHERE d.account_number = '${data.from_account_number}' AND d.is_delete = 1;`;
}