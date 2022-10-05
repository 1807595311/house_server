module.exports = (u)=>{
    return `insert into des_user (account_number,mechanism_name,city,establish_time) 
    values ('${u.account_number}','${u.mechanism_name}','${u.city}','${u.establish_time}')`;
}