const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    mode: 'development',
    devServer: {
        port: 8000,
    },
    plugins: [
        new HtmlWebpackPlugin({template: "./index.html"}),
    ],
};
