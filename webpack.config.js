/* eslint-disable */
const path = require("path");
const mode = process.env.NODE_ENV || "production";

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "worker.js",
    path: path.join(__dirname, "worker"),
  },
  mode,
  resolve: {
    extensions: [".ts"],
    plugins: [],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  node: {
    __dirname: true
  }
};
