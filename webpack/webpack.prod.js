const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      ADD_TRAILING_SLASH_TO_API_REQUEST: JSON.stringify(false)
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
})
