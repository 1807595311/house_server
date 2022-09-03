// 控制器层
// 收编所有控制器
let test = require(path.resolve(__basename, 'controller/test.js'));
let register = require(path.resolve(__basename, 'controller/register.js'));
let upload = require(path.resolve(__basename, 'controller/upload.js'));
module.exports = {
    // 测试接口
    test,
    register,
    upload
}