// 路由层

// 导入控制器层
const controller = require(path.resolve(__basename, 'controller/controller.js'))

module.exports = app =>{
    app.post('/test',controller.test), // 测试接口
    app.post('/register',controller.register), // 用户注册
    app.post('/upload',controller.upload),

    /*------------- 管理员端接口-------------- */
    app.post('/manage/register',controller.manage_register), // 管理员注册
    app.post('/manage/login',controller.manage_login), // 管理员登录
    app.get('/manage/getOrdinaryUserList',controller.manage_get_ordinary_userList), // 获取普通用户列表
    app.post('/manage/changeUserState',controller.changeUserState), // 修改 普通用户/设计机构 状态
    app.get('/manage/getDesignDepartmentList',controller.getDesignDepartmentList), // 获取设计机构列表
    app.get('/manage/getStatisticsInfo',controller.getStatisticsInfo), // 获取统计信息首页数据


    /*-------------  用户端接口 -------------*/
    app.post('/client/register_ord_user',controller.register_ord_user),
    app.post('/client/register_des_user',controller.register_des_user)

    
}