// 控制器层
// 收编所有控制器
let test = require(path.resolve(__basename, 'controller/test.js'));
let register = require(path.resolve(__basename, 'controller/register.js'));
let manage_register = require(path.resolve(__basename, 'controller/manage/register.js'));
let manage_login = require(path.resolve(__basename, 'controller/manage/login.js'));
let manage_get_ordinary_userList = require(path.resolve(__basename, 'controller/manage/getOrdinaryUserList.js'));
let changeUserState = require(path.resolve(__basename, 'controller/manage/changeUserState.js'));
let getDesignDepartmentList = require(path.resolve(__basename, 'controller/manage/getDesignDepartmentList.js'));

let upload = require(path.resolve(__basename, 'controller/upload.js'));
module.exports = {
    // 测试接口
    test,
    register,
    manage_register,
    manage_login,
    upload,
    manage_get_ordinary_userList,
    changeUserState,
    getDesignDepartmentList
}