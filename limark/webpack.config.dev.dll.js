/* eslint-disable no-console */
const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

export default {
  mode: isProduction ? 'production' : 'development',
  // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps
  // and https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'cheap-module-source-map',
  entry: {
    dllVendors: [
      'babel-polyfill',
      'react',
      'react-dom',
      'antd',
      'redux',
      'react-redux',
      "react-router",
      'react-router-redux',
      "axios",
      "classnames",
      "date-fns",
      "js-cookie",
      "lodash",
      "prop-types",
      "query-string",
      "react-amap",
      "react-dom-factories",
      //"react-draggable",
      "redux-thunk"
    ]
  },
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    // Note: Physical files are only output by the production build task `npm run build`.
    path: `${__dirname}/src/.cache`,
    library: '[name]_[chunkhash]',
    filename: 'dll.[name].js'
  },
  plugins: [
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      console.log(`${(percentage * 100).toFixed(2)}%`, message, ...args);
    }),
    new webpack.HotModuleReplacementPlugin(),// 这个在生产环境不用加，开发环境需要加
    new webpack.DllPlugin({
      path: `${__dirname}/src/.cache/manifest.json`,
      name: '[name]_[chunkhash]',
      context: __dirname
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.less']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }]
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.(woff|woff2)$/,
        use: [{
          loader: 'url-loader?limit=100000'
        }]
      },
      {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'file-loader?limit=10000&mimetype=application/octet-stream'
        }]
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'file-loader?limit=10000&mimetype=image/svg+xml'
        }]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.ico$/,
        use: [{
          loader: 'file-loader?name=[name].[ext]'
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader?'
        }, {
          loader: 'postcss-loader?'
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader?'
        }, {
          loader: 'postcss-loader?'
        }, {
          loader: 'less-loader?'
        }]
      }
    ]
  }
};
