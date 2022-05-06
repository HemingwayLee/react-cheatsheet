const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '0.0.0.0',
    open: true,
    clientLogLevel: 'silent',
    port: 9090,
    hot: true,
    proxy: {
      '/api': 'http://127.0.0.1:3000'
      // Not working
      // '/users/hemingwaylee/repos': 'https://api.github.com'
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": "defaults" 
              }],
              '@babel/preset-react'
            ]
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ]
}

module.exports = config;
