const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "normalize.css/normalize.css"; @import "@/main.scss";`,
      },
    },
  },
});
