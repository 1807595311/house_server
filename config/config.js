// 配置层

// 根据node运行环境执行相应的配置文件(开发配置文件、生产配置文件)

// 获取node运行环境
let env = process.env.NODE_ENV;
console.log('env==>',env);
// 根据node运行环境加载配置文件
module.exports = require(path.resolve(__basename, `config/config.${env}.js`))

console.log( '加载'+path.resolve(__basename, `config/config.${env}.js`) );