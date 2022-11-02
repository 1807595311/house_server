module.exports = (u)=>{
    return `insert into dynamic (account_number,title,content,content_md,tags,cover) 
    values ('${u.account_number}','${u.title}','${u.content}','${u.content_md}','${u.tags}','${u.cover}')`;
}