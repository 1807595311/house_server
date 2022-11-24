// 收编所有sql语句

// 公共sql
const insertImagesStr = require(path.resolve(__basename, 'db/sql/public/insertImagesStr.js'));
const insertUsersStr = require(path.resolve(__basename, 'db/sql/public/insertUsersStr.js'));
const findUser = require(path.resolve(__basename, 'db/sql/public/findUser.js'));
const find_headImg_url = require(path.resolve(__basename, 'db/sql/public/find_headImg_url.js'));
const find_orduser_or_desuser = require(path.resolve(__basename, 'db/sql/public/find_orduser_or_desuser.js'));
const find_user_img_url = require(path.resolve(__basename, 'db/sql/public/find_user_img_url.js'));
const find_cover = require(path.resolve(__basename, 'db/sql/public/find_cover.js'));
const find_desuser = require(path.resolve(__basename, 'db/sql/public/find_desuser.js'));

// 管理员sql
const manage_login = require(path.resolve(__basename, 'db/sql/manage/manage_login.js'));
const getOrdinaryUserList = require(path.resolve(__basename, 'db/sql/manage/getOrdinaryUserList.js'));
const getOrdinaryUserCount = require(path.resolve(__basename, 'db/sql/manage/getOrdinaryUserCount.js'));
const changeUserState = require(path.resolve(__basename, 'db/sql/manage/changeUserState.js'));
const getDesignDepartmentList = require(path.resolve(__basename, 'db/sql/manage/getDesignDepartmentList.js'));
const getDesignDepartmentCount = require(path.resolve(__basename, 'db/sql/manage/getDesignDepartmentCount.js'));
const getStatisticsInfo = require(path.resolve(__basename, 'db/sql/manage/getStatisticsInfo.js'));
const getDynamicList = require(path.resolve(__basename, 'db/sql/manage/getDynamicList.js'));
const changeDynamicState = require(path.resolve(__basename, 'db/sql/manage/changeDynamicState.js'));
const getDynamicCount = require(path.resolve(__basename, 'db/sql/manage/getDynamicCount.js'));

// 用户端sql
const inster_ord_user = require(path.resolve(__basename, 'db/sql/client/inster_ord_user.js'));
const inster_des_user = require(path.resolve(__basename, 'db/sql/client/inster_des_user.js'));
const login_ord = require(path.resolve(__basename, 'db/sql/client/login_ord.js'));
const login_des = require(path.resolve(__basename, 'db/sql/client/login_des.js'));
const inster_dynamic = require(path.resolve(__basename, 'db/sql/client/inster_dynamic.js'));
const home_info = require(path.resolve(__basename, 'db/sql/client/home_info.js'));
const inster_img_url = require(path.resolve(__basename, 'db/sql/client/inster_img_url.js'));
const dynamic_detail = require(path.resolve(__basename, 'db/sql/client/dynamic_detail.js'));
const find_dynamic_by_account = require(path.resolve(__basename, 'db/sql/client/find_dynamic_by_account.js'));
const inster_like = require(path.resolve(__basename, 'db/sql/client/inster_like.js'));
const find_fabulous = require(path.resolve(__basename, 'db/sql/client/find_fabulous.js'));
const delete_likes = require(path.resolve(__basename, 'db/sql/client/delete_likes.js'));
const find_fabulous_by_account = require(path.resolve(__basename, 'db/sql/client/find_fabulous_by_account.js'));
const find_likes_count = require(path.resolve(__basename, 'db/sql/client/find_likes_count.js'));
const find_collection = require(path.resolve(__basename, 'db/sql/client/find_collection.js'));
const inster_collection = require(path.resolve(__basename, 'db/sql/client/inster_collection.js'));
const delete_collection = require(path.resolve(__basename, 'db/sql/client/delete_collection.js'));
const find_collection_by_account = require(path.resolve(__basename, 'db/sql/client/find_collection_by_account.js'));
const search_dynamic = require(path.resolve(__basename, 'db/sql/client/search_dynamic.js'));
const find_my_dynamic = require(path.resolve(__basename, 'db/sql/client/find_my_dynamic.js'));
const edit_detail_dynamic = require(path.resolve(__basename, 'db/sql/client/edit_detail_dynamic.js'));
const update_dynamic = require(path.resolve(__basename, 'db/sql/client/update_dynamic.js'));
const find_count = require(path.resolve(__basename, 'db/sql/client/find_count.js'));
const delete_follow = require(path.resolve(__basename, 'db/sql/client/delete_follow.js'));
const inster_follow = require(path.resolve(__basename, 'db/sql/client/inster_follow.js'));
const find_follow = require(path.resolve(__basename, 'db/sql/client/find_follow.js'));
const find_follow_by_dynamic = require(path.resolve(__basename, 'db/sql/client/find_follow_by_dynamic.js'));
const search_users = require(path.resolve(__basename, 'db/sql/client/search_users.js'));
const find_follow_by_account = require(path.resolve(__basename, 'db/sql/client/find_follow_by_account.js'));
const find_other_userinfo = require(path.resolve(__basename, 'db/sql/client/find_other_userinfo.js'));
const find_dynamic_by_userinfo = require(path.resolve(__basename, 'db/sql/client/find_dynamic_by_userinfo.js'));
const find_comment_by_dynamic = require(path.resolve(__basename, 'db/sql/client/find_comment_by_dynamic.js'));
const insert_comment = require(path.resolve(__basename, 'db/sql/client/insert_comment.js'));
const dynamic_reply_comment = require(path.resolve(__basename, 'db/sql/client/dynamic_reply_comment.js'));

module.exports = {
    insertImagesStr,// 插入图片
    insertUsersStr,// 插入用户
    findUser, // 查找用户
    find_orduser_or_desuser, // 查找普通用户和设计机构
    find_user_img_url, // 查找普通用户和设计机构的头像
    find_cover, // 查找动态封面图片路径
    find_desuser, // 查询设计机构信息

    // 管理员
    manage_login, // 管理员登录
    find_headImg_url, // 查找用户头像
    getOrdinaryUserList, // 查询普通用户列表
    getOrdinaryUserCount, // 查询普通用户数量
    changeUserState, // 修改 普通用户/设计机构 状态
    getDesignDepartmentList, // 查询设计机构列表
    getDesignDepartmentCount, // 查询设计机构数量
    getStatisticsInfo, // 查询统计信息首页数据
    getDynamicList, // 查询动态管理列表
    getDynamicCount, // 查询动态数量
    changeDynamicState, // 修改动态状态

    // 用户端
    inster_ord_user, // 普通用户注册
    inster_des_user, // 设计机构注册
    login_ord, // 普通用户登录
    login_des, // 设计机构登录
    inster_dynamic, // 发布动态
    inster_img_url, // 插入封面图片
    home_info, // 首页数据
    dynamic_detail, // 动态详情
    find_dynamic_by_account, // 通过账号查找该用户的其他动态
    inster_like, // 点赞
    delete_likes, // 取消点赞
    find_fabulous, // 查询某动态是否被某用户点赞
    find_fabulous_by_account, // 分页查询用户点赞的动态
    find_likes_count, // 查询用户点赞动态数量
    find_collection, // 查询某动态是否被某用户收藏
    inster_collection, // 收藏
    delete_collection, // 取消收藏
    find_collection_by_account, // 分页查询用户收藏的动态
    search_dynamic, // 搜索动态
    find_my_dynamic, // 查询我的动态
    edit_detail_dynamic, // 查询编辑的动态详情
    update_dynamic, // 修改动态
    find_count, // 查询动态的点赞数，收藏数，评论数
    find_follow, // 查询某用户是否被该用户关注
    delete_follow, // 取消关注
    inster_follow, // 关注
    find_follow_by_dynamic, // 通过动态查询是否关注该用户
    search_users, // 搜索用户/机构
    find_follow_by_account, // 查询我的关注
    find_other_userinfo, // 查询该用户资料
    find_dynamic_by_userinfo, // 查询该用户的动态
    find_comment_by_dynamic, // 通过动态id查询该动态下的评论
    insert_comment, // 动态评论
    dynamic_reply_comment // 回复评论
}