module.exports = (u)=>{
    return `insert into users (account_number,password,sex,nickname,headimg,introduce,customer_type) 
    values ('${u.account_number}','${u.password}',${u.sex},'${u.nickname}',${u.headimg},'${u.introduce?u.introduce:'该用户很懒，什么都没留下'}',${u.customer_type})`;
}