// 路由层

// 导入控制器层
const controller = require(path.resolve(__basename, 'controller/controller.js'))

module.exports = app =>{
    app.post('/test',controller.test);// 测试接口
    app.post('/register',controller.register);// 用户注册
    app.post('/upload',controller.upload);
    app.post('/testResDy',controller.testResDy);

    /*------------- 管理员端接口-------------- */
    app.post('/manage/register',controller.manage_register);// 管理员注册
    app.post('/manage/login',controller.manage_login);// 管理员登录
    app.get('/manage/getOrdinaryUserList',controller.manage_get_ordinary_userList);// 获取普通用户列表
    app.post('/manage/changeUserState',controller.changeUserState);// 修改 普通用户/设计机构 状态
    app.get('/manage/getDesignDepartmentList',controller.getDesignDepartmentList);// 获取设计机构列表
    app.get('/manage/getStatisticsInfo',controller.getStatisticsInfo);// 获取统计信息首页数据
    app.get('/manage/getDynamicList',controller.getDynamicList);// 获取动态列表
    app.post('/manage/changeDynamicState',controller.changeDynamicState);// 修改动态状态


    /*-------------  用户端接口 -------------*/
    app.post('/client/register_ord_user',controller.register_ord_user);// 注册普通用户
    app.post('/client/register_des_user',controller.register_des_user);// 注册设计机构
    app.post('/client/login_ord',controller.login_ord);// 普通用户登录
    app.post('/client/login_des',controller.login_des);// 设计机构登录
    app.post('/client/release_dynamics',controller.release_dynamics);// 发布动态
    app.get('/client/home_info',controller.home_info);//首页数据
    app.post('/client/dynamic_detail',controller.dynamic_detail);// 动态详情
    app.post('/client/dynamic_likes',controller.dynamic_likes);// 点赞(取消点赞)
    app.post('/client/my_likes',controller.my_likes);// 我的点赞列表
    app.post('/client/dynamic_collection',controller.dynamic_collection);// 收藏(取消收藏)
    app.post('/client/my_collection',controller.my_collection);// 我的收藏列表
    app.get('/client/search_dynamic',controller.search_dynamic);// 搜索动态
    app.post('/client/my_dynamic',controller.my_dynamic);// 我的动态
    app.post('/client/dynamic_edit_detail',controller.dynamic_edit_detail);// 编辑动态详情
    app.post('/client/edit_dynamic',controller.edit_dynamic);// 编辑动态详情
    app.post('/client/user_follow',controller.user_follow); // 关注(取消关注)
    app.get('/client/search_users',controller.search_users);// 搜索用户/机构
    app.post('/client/my_follow',controller.my_follow);// 搜索用户/机构
    app.post('/client/find_other_userinfo',controller.find_other_userinfo); // 查看其他用户资料
    app.get('/client/find_dynamic_comment',controller.find_dynamic_comment); // 查看动态评论
    app.post('/client/dynamic_comment',controller.dynamic_comment); // 动态评论
    app.post('/client/dynamic_comment_reply',controller.dynamic_comment_reply); // 回复评论
    app.post('/client/my_message',controller.my_message); // 我的消息
    app.post('/client/my_comment',controller.my_comment); // 我的评论
    app.post('/client/delete_comment',controller.delete_comment); // 删除我的评论
    
}