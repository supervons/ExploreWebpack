const path = require('path');
const port = process.env.port || process.env.npm_config_port || 8081 // dev port
// 压缩选项
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  // JavaScript 执行入口文件，可以配置多个
  entry: {
    app:'./main.js',
    bbb:"./main2.js"
  },
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
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: '[name]_bundle.js',
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
    // https: true // 使用 https 服务
    // inline: false // 如果关闭 inline 则使用 iframe 预览，需要手动刷新
  },
  plugins: [new MiniCssExtractPlugin({
    // 文件名称随机
    filename: `[name]_[contenthash:8].css`,
  })],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  module: {
    rules: [ // 配置各类文件处理规则，
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        // use: [MiniCssExtractPlugin.loader,'css-loader'] // 抽离 CSS
        use: ['style-loader','css-loader'] // 处理顺序为从后到前，合并 CSS 进 bundle.js
      },
      {
        // 对非文本文件采用 file-loader 加载
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        use: ['file-loader'],
        include:[
          path.resolve(__dirname, 'assets'),
        ],
        exclude:[
          // path.resolve(__dirname, 'assets'),// 如果排除则打包失败
        ]
      }
    ]
  }
};