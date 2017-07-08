const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader','css-loader','sass-loader'];
var cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader','sass-loader'],
});
var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: {
    bundle: './src/app.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // filename: '[name].[chunkhash].js'
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: cssConfig,
      },
      { 
        test: /\.js$/,
        exclude: /node_modules/, 
        loader: 'babel-loader' 
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
      minify: { collapseWhitespace: true }
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true,
      disable: !isProd,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    port: 4200,
    hot: true,
    compress: true,
    historyApiFallback: true,
    stats: 'errors-only',
  }
}