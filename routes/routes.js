// 路由层

// 导入控制器层
const controller = require(path.resolve(__basename, 'controller/controller.js'))

module.exports = app =>{
    app.get('/test',controller.test),
    app.post('/register',controller.register),
    app.post('/manage/register',controller.manage_register),
    app.post('/manage/login',controller.manage_login),
    app.post('/upload',controller.upload)
    
}