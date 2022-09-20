// 开发环境配置
// 服务器配置
exports.serverOptions = {
    host: "http://127.0.0.1", // 主机地址
    port: 8000, // 端口
};

// 数据库配置
exports.dataBaseOptions = {
    host: "127.0.0.1", // 数据库的IP地址
    user: "root", // 登录数据库的账号
    password: "134608", // 登录数据库的密码
    database: "house", // 库名
    multipleStatements: true, // 允许同时请求多条 sql 语句
    timezone: "SYSTEM", // 解决时区时间统一的问题
};

// 静态资源虚拟路径配置
exports.virtualPath = {
    url: "/static/file",
};

// token配置
exports.tokenEncryption = {
    salt: "t_t", // 加盐
    expiresIn: "1d", // 有效期
};
