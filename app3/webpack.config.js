const path = require('path');
const port = process.env.port || process.env.npm_config_port || 8088 // dev port
const webpack = require('webpack'); // 访问内置的插件
// 压缩选项
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ConsoleLogOnBuildWebpackPlugin = require('./tools/ConsoleLogOnBuildWebpackPlugin');
// 模块联邦所需
const {ModuleFederationPlugin} = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");


module.exports = {
  mode: 'development',// 开启后调试较慢
  // JavaScript 执行入口文件，可以配置多个
  entry:['./main.js','./main2.js'],
  resolve:{
    alias:{ // ./assets 被映射成 images，$ 为以 images 结尾
      'images': './assets/'
      // 'images$': './assets/question.png''
    },
    extensions: ['.js', '.json'], // 配置在尝试过程中用到的后缀列表
    // 设置引入文件夹，默认只有 node_modules，设置后可以直接引入，如 require('question.png');
    modules:['./assets/','node_modules']
  },
  output: {
    clean: true, // 在生成文件之前清空 output 目录
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: '[id]_bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    host: 'localhost',
    port: port,
    headers: { // 增加一些调试时的请求头，方便调试
      'X-foo':'bar'
    },
    open: false,
    hot: true,
    watchFiles: '*',
    // https: true // 使用 https 服务
    // inline: false // 如果关闭 inline 则使用 iframe 预览，需要手动刷新
  },
  plugins: [
    new MiniCssExtractPlugin({
    // 文件名称随机
    filename: `[name]_css.css`,
    }),
    new HtmlWebpackPlugin({template: "./index.html"}),
    new ConsoleLogOnBuildWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "app3",
      filename: 'remoteEntry.js', // 入口页
      exposes: { // 暴露模块
        './main': './main.js',
        './main2': './main2.js',
      },
      shared: {},
    }),
    new ExternalTemplateRemotesPlugin(),
    new webpack.ProgressPlugin() // 显示编译进度
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  module: {
    rules: [ // 配置各类文件处理规则，
      {
        test:/\.vons$/,
        use: ["./tools/vons-loader.js"],
      },
      {
        test:/\.js$/,
        use: ["./tools/customer-loader2.js", "./tools/customer-loader.js"],   // 看这里，看这里
      },
      {
        test: /\.png$/,
        type: 'asset/resource'
      },
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        // use: [MiniCssExtractPlugin.loader,'css-loader'] // 抽离 CSS
        use: ['style-loader','css-loader'] // 处理顺序为从后到前，合并 CSS 进 bundle.js
      },
      // {
      //   // 对非文本文件采用 file-loader 加载
      //   test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
      //   use: ['file-loader'],
      //   include:[
      //     path.resolve(__dirname, 'assets'),
      //   ],
      //   exclude:[
      //     // path.resolve(__dirname, 'assets'),// 如果排除则打包失败
      //   ]
      // },
      {
        // 增加对 SCSS 文件的支持
        test: /\.scss$/,
        // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ]
  },
  // externals:{ // 忽略第三方包，比如使用 CDN 的方式去进行加载
  //   // 把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery
  //   jquery: 'jQuery'
  // },
  // watch: true,
  // // 监听模式运行时的参数
  // // 在开启监听模式时，才有意义
  // watchOptions: {
  //   // 不监听的文件或文件夹，支持正则匹配
  //   // 默认为空
  //   ignored: /node_modules/,
  //   // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
  //   // 默认为 300ms
  //   aggregateTimeout: 3000,
  //   // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
  //   // 默认每隔1000毫秒询问一次
  //   poll: 1000
  // }
};
