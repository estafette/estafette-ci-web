const webpack = require('webpack')
const merge = require('webpack-merge')
const prod = require('./webpack.prod.js')

module.exports = merge(prod, {
  plugins: [
    new webpack.DefinePlugin({
      ADD_TRAILING_SLASH_TO_API_REQUEST: JSON.stringify(true)
    })
  ]
})
