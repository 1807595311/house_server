// 控制器层

// 收编所有控制器
let test = require(path.resolve(__basename, 'controller/test.js'));
let register = require(path.resolve(__basename, 'controller/register.js'));
let testResDy = require(path.resolve(__basename, 'controller/testResDy.js'));

// 管理员端接口
let manage_register = require(path.resolve(__basename, 'controller/manage/register.js')); // 注册
let manage_login = require(path.resolve(__basename, 'controller/manage/login.js')); // 登录
let manage_get_ordinary_userList = require(path.resolve(__basename, 'controller/manage/getOrdinaryUserList.js')); // 普通用户列表
let changeUserState = require(path.resolve(__basename, 'controller/manage/changeUserState.js')); // 改变用户/设计机构 状态(启用/禁用)
let getDesignDepartmentList = require(path.resolve(__basename, 'controller/manage/getDesignDepartmentList.js')); // 设计机构列表
let getStatisticsInfo = require(path.resolve(__basename, 'controller/manage/getStatisticsInfo.js')); // 获取统计信息

// 用户端接口
let register_ord_user = require(path.resolve(__basename, 'controller/client/register_ord_user.js')); // 普通用户注册
let register_des_user = require(path.resolve(__basename, 'controller/client/register_des_user.js')); // 设计机构注册
let login_ord = require(path.resolve(__basename, 'controller/client/login_ord.js')); // 普通用户登录
let login_des = require(path.resolve(__basename, 'controller/client/login_des.js')); // 设计机构登录
let release_dynamics = require(path.resolve(__basename, 'controller/client/release_dynamics.js')); // 发布动态
let home_info = require(path.resolve(__basename, 'controller/client/home_info.js')); // 首页数据
let dynamic_detail = require(path.resolve(__basename, 'controller/client/dynamic_detail.js')); // 获取案例详情
let dynamic_likes = require(path.resolve(__basename, 'controller/client/dynamic_likes.js')); // 点赞
let my_likes = require(path.resolve(__basename, 'controller/client/my_likes.js')); // 我的点赞


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
    getDesignDepartmentList,
    getStatisticsInfo,
    register_ord_user,
    register_des_user,
    login_ord,
    login_des,
    testResDy,
    release_dynamics,
    home_info,
    dynamic_detail,
    dynamic_likes,
    my_likes
}