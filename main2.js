// main2
require('./main.scss');
// ./assets 被映射成 images 
require('images/question.png');
import a from 'question.png' // 能直接引入是因为 webpack 配置了 modules
// 通过 CommonJS 规范导入 show 函数，不用带 .js 后缀是因为 webpack 的 resolve 里面配置了 extensions
const show = require('./show');
// 执行 show 函数
show('Webpack');