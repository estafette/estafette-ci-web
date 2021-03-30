const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const ApiMocker = require('connect-api-mocker')

const mergedConfig = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    before: app => {
      app.use(ApiMocker('/api', 'mocks/api'))
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
})

module.exports = mergedConfig

console.log('webpack config', JSON.stringify(mergedConfig))
