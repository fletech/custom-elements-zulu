const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    "services-grid": "./src/components/ServicesGrid.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
};
