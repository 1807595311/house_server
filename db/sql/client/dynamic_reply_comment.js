// 回复评论
module.exports = (d)=>{
    return `INSERT INTO COMMENT (dynamic_id,account_number,content,to_account_number,a_id,p_id) 
    VALUES(${d.dynamic_id},'${d.account_number}','${d.content}','${d.to_account_number}',${d.a_id},${d.p_id});`;
}