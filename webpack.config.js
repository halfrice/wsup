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
    vendor: [
      'jquery',
      'lodash',
      'bootstrap-loader',
      'tether',
      'font-awesome-sass-loader!./font-awesome.config.js',
    ],
    bundle: './src/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
    // filename: 'app.bundle.js'
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
      { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports-loader?jQuery=jquery' },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader' },
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
      disable: !isProd,
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Tether: "tether",
      "window.Tether": "tether",
      Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports-loader?Util!bootstrap/js/dist/util",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
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