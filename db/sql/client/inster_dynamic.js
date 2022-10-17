module.exports = (u)=>{
    return `insert into dynamic (account_number,title,content,cover) 
    values ('${u.account_number}','${u.title}','${u.content}','${u.cover}')`;
}