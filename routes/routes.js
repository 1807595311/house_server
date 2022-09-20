// 路由层

// 导入控制器层
const controller = require(path.resolve(__basename, 'controller/controller.js'))

module.exports = app =>{
    app.post('/test',controller.test),
    app.post('/register',controller.register),
    app.post('/manage/register',controller.manage_register),
    app.post('/manage/login',controller.manage_login),
    app.get('/manage/ordinary_users_home_page',controller.ordinary_users_home_page),

    app.post('/upload',controller.upload)
    
}