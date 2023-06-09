const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");// 运行时加载远程应用
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devServer: {
        port: 8002
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
            name: 'app4',
            filename: 'remoteEntry.js',
            exposes: {
                './home': './src/app4.js'
            },
            remotes: {
                base: "base@http://localhost:8001/remoteEntry.js",
            },
            shared: { 'react': { singleton: true }, 'react-dom': { singleton: true } },
        }),
        new ExternalTemplateRemotesPlugin(),
        new HtmlWebpackPlugin({template: "./index.html"}),
    ],
};
