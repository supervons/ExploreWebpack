// main2
require('./main.scss');
// ./assets 被映射成 images
require('!file-loader!images/question.png'); // 内联loader方式加载非JS/JSON资源
import a from 'question.png' // 能直接引入是因为 webpack 配置了 modules
// 通过 CommonJS 规范导入 show 函数，不用带 .js 后缀是因为 webpack 的 resolve 里面配置了 extensions
const show = require('./show');
// 执行 show 函数
show('JS App3：my webpack');
import template from './customer-type/test.vons'
