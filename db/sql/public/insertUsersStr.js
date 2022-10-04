module.exports = (u)=>{
    return `insert into users (account_number,password,sex,nickname,headimg,introduce,customer_type) 
    values ('${u.account_number}','${u.password}',${u.sex},'${u.nickname}',${u.headimg},'${u.introduce}',${u.customer_type})`;
}