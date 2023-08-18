const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin'); // 运行时加载远程应用
const { ModuleFederationPlugin } = require('webpack').container;
const VueLoaderPlugin = require('vue-loader/lib/plugin');
let whiteListedModules = ['vue', 'element-ui'];

module.exports = {
  entry: './src/main.js',
  mode: 'development',
  devServer: {
    port: 8003,
    hot: true,
  },
  output: {
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /.(jpe?g|png|gif|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.mp4$/,
        use: 'file-loader?name=videos/[name].[ext]',
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'vue1',
      filename: 'remoteEntry.js',
      exposes: {
        './vue-home': './src/app.vue',
      },
      remotes: {
        base: 'base@http://localhost:8001/remoteEntry.js',
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' }),
    new VueLoaderPlugin(),
  ],
};
