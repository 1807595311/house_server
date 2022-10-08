// 收编所有sql语句

// 公共sql
const insertImagesStr = require(path.resolve(__basename, 'db/sql/public/insertImagesStr.js'));
const insertUsersStr = require(path.resolve(__basename, 'db/sql/public/insertUsersStr.js'));
const findUser = require(path.resolve(__basename, 'db/sql/public/findUser.js'));
const find_headImg_url = require(path.resolve(__basename, 'db/sql/public/find_headImg_url.js'));
const find_orduser_or_desuser = require(path.resolve(__basename, 'db/sql/public/find_orduser_or_desuser.js'));
const find_user_img_url = require(path.resolve(__basename, 'db/sql/public/find_user_img_url.js'));

// 管理员sql
const manage_login = require(path.resolve(__basename, 'db/sql/manage/manage_login.js'));
const getOrdinaryUserList = require(path.resolve(__basename, 'db/sql/manage/getOrdinaryUserList.js'));
const getOrdinaryUserCount = require(path.resolve(__basename, 'db/sql/manage/getOrdinaryUserCount.js'));
const changeUserState = require(path.resolve(__basename, 'db/sql/manage/changeUserState.js'));
const getDesignDepartmentList = require(path.resolve(__basename, 'db/sql/manage/getDesignDepartmentList.js'));
const getDesignDepartmentCount = require(path.resolve(__basename, 'db/sql/manage/getDesignDepartmentCount.js'));
const getStatisticsInfo = require(path.resolve(__basename, 'db/sql/manage/getStatisticsInfo.js'));

// 用户端sql
const inster_ord_user = require(path.resolve(__basename, 'db/sql/client/inster_ord_user.js'));
const inster_des_user = require(path.resolve(__basename, 'db/sql/client/inster_des_user.js'));
const login_ord = require(path.resolve(__basename, 'db/sql/client/login_ord.js'));
const login_des = require(path.resolve(__basename, 'db/sql/client/login_des.js'));

module.exports = {
    insertImagesStr,// 插入图片
    insertUsersStr,// 插入用户
    findUser, // 查找用户
    find_orduser_or_desuser, // 查找普通用户和设计机构
    find_user_img_url, // 查找普通用户和设计机构的头像

    // 管理员
    manage_login, // 管理员登录
    find_headImg_url, // 查找用户头像
    getOrdinaryUserList, // 查询普通用户列表
    getOrdinaryUserCount, // 查询普通用户数量
    changeUserState, // 修改 普通用户/设计机构 状态
    getDesignDepartmentList, // 查询设计机构列表
    getDesignDepartmentCount, // 查询设计机构数量
    getStatisticsInfo, // 查询统计信息首页数据

    // 用户端
    inster_ord_user, // 普通用户注册
    inster_des_user, // 设计机构注册
    login_ord, // 普通用户登录
    login_des // 设计机构登录
}