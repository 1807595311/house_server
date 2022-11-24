module.exports = (d)=>{
    return `INSERT INTO comment (dynamic_id,account_number,content) 
    VALUES(${d.dynamic_id},'${d.account_number}','${d.content}');`;
}