const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const mergedConfig = merge(common, {
  mode: 'production',
  plugins: [
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

module.exports = mergedConfig

console.log('webpack config', JSON.stringify(mergedConfig))
