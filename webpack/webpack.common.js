const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    app: './src/main.js'
  },
  output: {
    publicPath: '/',
    filename: 'static/js/[name].[contenthash].js',
    path: path.resolve(__dirname, '..', 'dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '..', 'src')
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ],
    sideEffects: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    }
  },
  stats: {
    colors: true,
    modules: false,
    children: false
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, '..') }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.IgnorePlugin(
      /^\.\/locale$/,
      /moment$/
    ),
    new webpack.HashedModuleIdsPlugin()
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        include: [ path.resolve(__dirname, '..', 'src'), path.resolve(__dirname, '..', 'test') ],
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '..', 'src'),
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-syntax-dynamic-import'],
          presets: [
            ['@babel/preset-env', { modules: false }]
          ]
        }
      },
      {
        test: /\.vue$/,
        include: path.resolve(__dirname, '..', 'src'),
        loader: 'vue-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: path.resolve(__dirname, '..', 'src'),
        loader: 'file-loader',
        options: {
          name: 'static/images/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: path.resolve(__dirname, '..', 'src'),
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[name].[hash].[ext]'
        }
      }
    ]
  }
}
