const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "127.0.0.1",
    port: 8008
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/styles/public.scss";`,
      },
    }
  }
});
