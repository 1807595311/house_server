// 当前日期前七天sql语句
const GetSevenDaysSql = require(path.resolve(__basename, 'utils/getSevenDays.js'));

module.exports = (req, res) => {
    let sendData = {};
    // 统计查询，查询用户表中 普通用户人数、设计机构人数、性别总人数(不包括未知、2) 、男性总人数、女性总人数、动态总数
    // 查询统计城市设计机构人数
    let p1 = new Promise((resolve, reject) => {
        db.query(sqlStr.getStatisticsInfo(), (err, result) => {
            if (err) return res.send({ msg: err, status: -1 });
            if (result.length > 0) {
                resolve({
                    otherStatistics: result[0][0],
                    cityStatistics: result[1],
                    fansLeaderboard: result[2],
                    userLikeStyle: result[3]
                })
            }
        });
    })
    let getSevenDays = new GetSevenDaysSql();
    let sevenDaysSqlArr = getSevenDays.sql();
    let proArr = [];
    proArr.push(p1);
    // 查询当前日期的前7天的新增普通用户人数
    sevenDaysSqlArr.forEach(v => {
        proArr.push( new Promise((resolve, reject) => {
            db.query(v, (err, result) => {
                resolve(result[0]);
            });
        }) )
    });
    Promise.all(proArr).then(result=>{
        let statistics =  result[0];
        result.shift(result[0]);
        let oneWeekAddUsers = result;
        sendData = {...statistics,oneWeekAddUsers,status: 2}
        res.send(sendData)
    }).catch(err=>{
        res.send({status:-1,data:err})
    })
}