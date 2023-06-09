const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");// 运行时加载远程应用
const { ModuleFederationPlugin } = require('webpack').container;
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devServer: {
        port: 8003
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'vue1',
            filename: 'remoteEntry.js',
            exposes: {
                './vue-home': './src/app.vue'
            },
        }),
        new ExternalTemplateRemotesPlugin(),
        new HtmlWebpackPlugin({template: "./index.html"}),
        new VueLoaderPlugin(),
    ],
};
