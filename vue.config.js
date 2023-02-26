const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,// 关闭eslint校验工具
  devServer: {
    host: '127.0.0.1',
    port: '8009'
  }
})
