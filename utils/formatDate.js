const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
// 将utf格式时间转为 YYYY-MM-DD HH:mm:ss
module.exports = (date) => {
    dayjs.extend(utc);
    return dayjs.utc(date).format("YYYY-MM-DD HH:mm:ss");
};
