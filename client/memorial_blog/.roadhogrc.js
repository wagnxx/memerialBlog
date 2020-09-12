const { resolve } = require("path");

module.exports = {
  extraBabelPlugins: [
    "transform-runtime",
    ["import", { libraryName: "antd", style: "css" }],
  ],
  
};
