const { resolve } = require("path");

module.exports = {
  alias: {
    "@": resolve(__dirname, "src"),
    "@routes": resolve(__dirname, "src/routes"),
  },
  proxy: {
    // "/addr": {
    //   target: "http://localhost:8000/",
    //   pathRewrite: { "^/addr.*$": "/" },
    // },
    // "/api": {
    //   target: "http://localhost:3000/api",
    //   pathRewrite: { "^/api": "/api" },
   
    // },
  },
  disableCSSModules: true,
};
