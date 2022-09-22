// 收编所有sql语句
const insertImagesStr = require(path.resolve(__basename, 'db/sql/manage/insertImagesStr.js'));
const insertUsersStr = require(path.resolve(__basename, 'db/sql/manage/insertUsersStr.js'));
const findUser = require(path.resolve(__basename, 'db/sql/manage/findUser.js'));
const find_headImg_url = require(path.resolve(__basename, 'db/sql/manage/find_headImg_url.js'));
const manage_login = require(path.resolve(__basename, 'db/sql/manage/manage_login.js'));
const getOrdinaryUserList = require(path.resolve(__basename, 'db/sql/manage/getOrdinaryUserList.js'));
const getOrdinaryUserCount = require(path.resolve(__basename, 'db/sql/manage/getOrdinaryUserCount.js'));
const changeUserState = require(path.resolve(__basename, 'db/sql/manage/changeUserState.js'));
const getDesignDepartmentList = require(path.resolve(__basename, 'db/sql/manage/getDesignDepartmentList.js'));
const getDesignDepartmentCount = require(path.resolve(__basename, 'db/sql/manage/getDesignDepartmentCount.js'));

module.exports = {
    insertImagesStr,// 插入图片
    insertUsersStr,// 插入用户
    findUser, // 查找用户
    manage_login, // 管理员登录
    find_headImg_url, // 查找用户头像
    getOrdinaryUserList, // 查询普通用户列表
    getOrdinaryUserCount, // 查询普通用户数量
    changeUserState, // 修改 普通用户/设计机构 状态
    getDesignDepartmentList, // 查询设计机构列表
    getDesignDepartmentCount, // 查询设计机构数量
}