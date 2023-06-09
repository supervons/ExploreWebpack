const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");// 运行时加载远程应用
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: './src/main.js',
    mode: 'development',
    devServer: {
        port: 8001,
        proxy:{
            "/api":"http://39.105.24.114:8088"
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react"],
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'base',
            filename: 'remoteEntry.js',
            exposes: {
                './utils': './src/utils.js'
            },
            remotes: {
                app4: "app4@http://localhost:8002/remoteEntry.js",
            },
            shared: { 'react': { singleton: true }, 'react-dom': { singleton: true } },
        }),
        new ExternalTemplateRemotesPlugin(),
        new HtmlWebpackPlugin({template: "./index.html"}),
    ],
};