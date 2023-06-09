const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");// 运行时加载远程应用
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devServer: {
        port: 8001,
        proxy:{
            "/api":"http://xxx:8088"
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
                './main': './src/main.js'
            },
            remotes: {
                app4: "app4@localhost:8002/remoteEntry.js",
            },
        }),
        new ExternalTemplateRemotesPlugin(),
        new HtmlWebpackPlugin({template: "./index.html"}),
    ],
};
