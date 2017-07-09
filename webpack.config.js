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
    // something: 'webpack-dev-server/client?http://localhost:4200',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: '[name].[chunkhash].js'
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/, 
        loader: 'babel-loader' 
      },
      {
        test: /\.(css|scss)$/,
        use: isProd ? cssProd : cssDev,
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          'file-loader?name=[name].[ext]&outputPath=imgs/',
          'image-webpack-loader'
        ]
      },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader' },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
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
    contentBase: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
    port: 4200,
    hot: true,
    inline: true,
    compress: true,
    historyApiFallback: true,
    // stats: 'errors-only',
  },
  devtool: isProd ? 'source-map' : 'eval-source-map',
}