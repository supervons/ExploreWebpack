/**
 * 使用 Node Script 打包项目
 * Compile project with Node Script.
 */
const webpack = require('webpack'); // 访问 webpack 运行时(runtime)
const configuration = require('./webpack.config.js');

let compiler = webpack(configuration);

new webpack.ProgressPlugin().apply(compiler);

compiler.run(function (err, stats) {
    console.log('The end...')
});
