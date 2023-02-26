const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint校验工具
  devServer: {
    host: "127.0.0.1",
    port: 8008,
    allowedHosts: 'all',
    historyApiFallback: true
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/styles/public.scss";`,
      },
    }
  },
  configureWebpack: {
    externals: {
      'AMap': 'AMap' // 高德地图配置
    }
  }
});
