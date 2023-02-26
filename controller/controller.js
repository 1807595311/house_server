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
let getDynamicList = require(path.resolve(__basename, 'controller/manage/getDynamicList.js')); // 获取动态列表
let changeDynamicState = require(path.resolve(__basename, 'controller/manage/changeDynamicState.js')); // 修改动态状态

// 用户端接口
let register_ord_user = require(path.resolve(__basename, 'controller/client/register_ord_user.js')); // 普通用户注册
let register_des_user = require(path.resolve(__basename, 'controller/client/register_des_user.js')); // 设计机构注册
let login_ord = require(path.resolve(__basename, 'controller/client/login_ord.js')); // 普通用户登录
let login_des = require(path.resolve(__basename, 'controller/client/login_des.js')); // 设计机构登录
let release_dynamics = require(path.resolve(__basename, 'controller/client/release_dynamics.js')); // 发布动态
let home_info = require(path.resolve(__basename, 'controller/client/home_info.js')); // 首页数据
let dynamic_detail = require(path.resolve(__basename, 'controller/client/dynamic_detail.js')); // 获取案例详情
let dynamic_likes = require(path.resolve(__basename, 'controller/client/dynamic_likes.js')); // 点赞(取消点赞)
let my_likes = require(path.resolve(__basename, 'controller/client/my_likes.js')); // 我的点赞列表
let dynamic_collection = require(path.resolve(__basename, 'controller/client/dynamic_collection.js')); // 收藏(取消收藏)
let my_collection = require(path.resolve(__basename, 'controller/client/my_collection.js')); // 我的收藏列表
let search_dynamic = require(path.resolve(__basename, 'controller/client/search_dynamic.js')); // 搜索动态
let my_dynamic = require(path.resolve(__basename, 'controller/client/my_dynamic.js')); // 我的动态
let dynamic_edit_detail = require(path.resolve(__basename, 'controller/client/dynamic_edit_detail.js')); // 编辑动态详情
let edit_dynamic = require(path.resolve(__basename, 'controller/client/edit_dynamic.js')); // 编辑动态
let user_follow = require(path.resolve(__basename, 'controller/client/user_follow.js')); // 关注（取消关注）
let search_users = require(path.resolve(__basename, 'controller/client/search_users.js')); // 搜索机构
let my_follow = require(path.resolve(__basename, 'controller/client/my_follow.js')); // 我的关注
let find_other_userinfo = require(path.resolve(__basename, 'controller/client/find_other_userinfo.js')); // 查看其他用户资料
let find_dynamic_comment = require(path.resolve(__basename, 'controller/client/find_dynamic_comment.js')); // 获取动态评论
let dynamic_comment = require(path.resolve(__basename, 'controller/client/dynamic_comment.js')); // 动态评论
let dynamic_comment_reply = require(path.resolve(__basename, 'controller/client/dynamic_comment_reply.js')); // 回复评论
let my_message = require(path.resolve(__basename, 'controller/client/my_message.js')); // 查询我的消息
let my_comment = require(path.resolve(__basename, 'controller/client/my_comment.js')); // 查询我的评论
let delete_comment = require(path.resolve(__basename, 'controller/client/delete_comment.js')); // 删除我的评论
let user_info = require(path.resolve(__basename, 'controller/client/user_info.js')); // 查询个人资料
let upload_headimg = require(path.resolve(__basename, 'controller/client/upload_headimg.js')); // 修改用户头像
let edit_user_info = require(path.resolve(__basename, 'controller/client/edit_user_info.js')); // 修改用户基本资料
let edit_other_userInfo = require(path.resolve(__basename, 'controller/client/edit_other_userInfo.js')); // 修改用户或机构资料
let find_style_list = require(path.resolve(__basename, 'controller/client/find_style_list.js')); // 查询装修风格
let edit_password = require(path.resolve(__basename, 'controller/client/edit_password.js')); // 修改用户密码
let cancellation_user = require(path.resolve(__basename, 'controller/client/cancellation_user.js')); // 注销用户
let find_contact = require(path.resolve(__basename, 'controller/client/find_contact.js')); // 查询用户联系方式
let send_consult = require(path.resolve(__basename, 'controller/client/send_consult.js')); // 发送咨询
let my_consult = require(path.resolve(__basename, 'controller/client/my_consult.js')); // 查询我的咨询
let edit_consult_read = require(path.resolve(__basename, 'controller/client/edit_consult_read.js')); // 由设计机构 修改咨询已读 状态
let delete_consult = require(path.resolve(__basename, 'controller/client/delete_consult.js')); // 咨询删除
let insert_house_info = require(path.resolve(__basename, 'controller/client/insert_house_info.js')); // 添加房屋信息
let find_house_info = require(path.resolve(__basename, 'controller/client/find_house_info.js')); // 获取房屋信息列表
let delete_house = require(path.resolve(__basename, 'controller/client/delete_house.js')); // 删除房屋信息
let find_house_by_id = require(path.resolve(__basename, 'controller/client/find_house_by_id.js')); // 查询房屋信息
let find_other_user_fabulous = require(path.resolve(__basename, 'controller/client/find_other_user_fabulous.js')); // 查询其他用户的点赞列表



let upload = require(path.resolve(__basename, 'controller/upload.js'));
module.exports = {
    test,   // 测试接口
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
    my_likes,
    dynamic_collection,
    my_collection,
    search_dynamic,
    my_dynamic,
    dynamic_edit_detail,
    edit_dynamic,
    user_follow,
    getDynamicList,
    changeDynamicState,
    search_users,
    my_follow,
    find_other_userinfo,
    find_dynamic_comment,
    dynamic_comment,
    dynamic_comment_reply,
    my_message,
    my_comment,
    delete_comment,
    user_info,
    upload_headimg,
    edit_user_info,
    edit_other_userInfo,
    find_style_list,
    edit_password,
    cancellation_user,
    find_contact,
    send_consult,
    my_consult,
    edit_consult_read,
    delete_consult,
    insert_house_info,
    find_house_info,
    delete_house,
    find_house_by_id,
    find_other_user_fabulous
}