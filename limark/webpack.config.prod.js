const webpack = require('webpack');
const HappyPack = require('happypack');
const path = require('path');
const fs = require('fs');
const os = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const lessToJs = require('less-vars-to-js');
const { travelDir, getEntries, getEntireName, getReplParams } = require('./tools/helps');

let happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

let mode = 'test'; //根据环境使用不同的主题
let replMode = getReplParams('mode');
if (replMode) {
  mode = replMode[0];
}

/**
 * [Mode2PublicPath description]预发和线上环境资源上cdn
 * @type {Object}
 */
const Mode2PublicPath = {
  'test': '/js/',
  'debug': '/js/',
  'release': '/js/',
  'online': '/js/'
};


const viewsPath = '../views/';
const mockPath = [];
// 压缩混淆代码开关，默认开启
let minimize = (mode != 'debug');
const sourceMap = !minimize;

travelDir(viewsPath, mockPath);
console.log(viewsPath, mockPath);
const getHappyPackPlugin = () => [
  new HappyPack({
    id: 'happyTS',
    loaders: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'ts-loader',
        options: { happyPackMode: true }
      }
    ],
    threadPool: happyThreadPool,
    verbose: true,
  }),
  new HappyPack({
    id: 'happyJS',
    loaders: [
      {
        loader: 'babel-loader',
      }
    ],
    threadPool: happyThreadPool,
    verbose: true,
  }),
  new HappyPack({
    id: 'happyLESS',
    loaders: [
      {
        loader: 'css-loader',
        options: {
          minimize: minimize,
          sourceMap: sourceMap
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: sourceMap
        }
      }, {
        loader: 'less-loader',
        options: {
          sourceMap: sourceMap
        }
      }
    ],
    threadPool: happyThreadPool,
    verbose: true,
  }),
  new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })
];console.log(__dirname);
const p__dirname=__dirname.replace(/[\\/]\w+$/,"");//"E:\1\2\3" 修改为 "E:\1\2"
const getHtmlWebpackPlugin = () => {
  // generate ftl plugin
  const htmlWebpackPlugin = mockPath
  // skip /common/ directory
    .filter((pt) => {
      return pt.indexOf(`${path.sep}common${path.sep}`) === -1;
    })
    .map((pt) => {
      pt=pt.substring(2);//..\\a\\b\\c 转化为 
      const chunkName = getEntireName(pt);console.log(`${p__dirname}${pt}`);
      let _filename=`${p__dirname}/publish/views/${chunkName}`;
      if(chunkName.indexOf(".html")<0){
        _filename+=".ftl";
      }
      return new HtmlWebpackPlugin({
        filename: _filename,
        template: `${p__dirname}${pt}`,
        inject: true,
        minify: false
      });
    });
  return htmlWebpackPlugin;
};

// more info: https://github.com/isaacs/node-glob
const newEntries = getEntries(['./src/entries/**/*.js']);
console.log(newEntries);
// 库和工具, 公用率 使用频率	更新频率：高 高	低
const libs = {
  'babel-polyfill': 'babel-polyfill',
  'ppfish': 'ppfish',
  'react': 'react',
  'react-dom': 'react-dom',
  'react-router': 'react-router',
  'redux': 'redux',
  'react-redux': 'react-redux',
  'react-router-redux': 'react-router-redux',
};
export default {
  // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps
  // and https://webpack.github.io/docs/configuration.html#devtool
  mode: 'production',
  devtool: sourceMap ? 'cheap-module-source-map' : false,
  optimization: {
    minimize: minimize,
    minimizer: [
      minimize ? new UglifyJsPlugin({
        sourceMap: sourceMap,
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            //warnings: false
          }
        }
      }) : null,
      minimize ? new OptimizeCSSAssetsPlugin({}) : null
    ].filter(Boolean),
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  entry: newEntries,
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: `${p__dirname}/publish/static/js`,
    publicPath: Mode2PublicPath[mode],
    filename: '[name].js',//'[name].[chunkhash].js',
    chunkFilename: '[name].js'//'[name].[chunkhash].js'
  },
  plugins: [
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      console.log(`${(percentage * 100).toFixed(2)}%`, message, ...args);
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    })
  ]
    .concat(getHtmlWebpackPlugin())
    .concat(getHappyPackPlugin())
    .concat([
      // views/common文件夹直接拷贝到dist, to的路径相对于publicPath
      new CopyWebpackPlugin([{
        context: '../views/',
        from: './common/**/*',
        to: '../../views'
      }]),
      // new CopyWebpackPlugin([{
      //   context: '../publish/views/',
      //   from: './daily/*.html',
      //   to: '../../static'
      // }])
      // ,
      // new CopyWebpackPlugin([{
      //   context: './src/vendor/',
      //   from: '**/*',
      //   to: './vendor'
      // }])
    ]),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader'
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
      // 只处理./source/assets/css/lib
      // for css lib splitting
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'happypack/loader',
            options: {
              id: 'happyLESS',
            }
          }
        ]
      },
      {
        test: /(\.ftl)$/,
        use: [{
          loader: 'ftl-loader-prod'
        }]
      }
    ]
  },
  // 定义loader从哪里搜索
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'tools/loader')
    ]
  }
};
