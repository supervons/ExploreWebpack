const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin"); // 运行时加载远程应用
const { ModuleFederationPlugin } = require("webpack").container;
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: "./src/main.js",
  mode: "development",
  devServer: {
    port: 8001,
    proxy: {
      "/api": "http://xxx:8088",
    },
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
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "base",
      filename: "remoteEntry.js",
      exposes: {
        "./utils": "./src/utils.js",
      },
      remotes: {
        app4: "app4@http://localhost:8002/remoteEntry.js",
        vue1: "vue1@http://localhost:8003/remoteEntry.js",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new VueLoaderPlugin(),
  ],
};
