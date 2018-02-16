const path = require("path");

module.exports = function(env) {
  return {
    devtool: env === "production" ? "source-map" : "cheap-eval-source-map",
    entry: "./src/index.js",
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "public")
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader",
          exclude: /(node_modules)/
        }
      ]
    }
  };
};
