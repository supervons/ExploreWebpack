const path = require('path');
// 压缩选项
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [new MiniCssExtractPlugin({
    // 文件名称随机
    filename: `[name]_[contenthash:8].css`,
  })],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        // use: [MiniCssExtractPlugin.loader,'css-loader']
        use: ['style-loader','css-loader']
      }
    ]
  }
};