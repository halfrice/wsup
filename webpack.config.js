const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','sass-loader'],
          // filename: '[name].[contenthash].css'
        })
      },
      { 
        test: /\.js$/,
        exclude: /node_modules/, 
        loader: 'babel-loader' 
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
      minify: { collapseWhitespace: true }
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true,
    }),
  ]


}