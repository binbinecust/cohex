/* eslint-disable no-console */
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const lessToJs = require('less-vars-to-js');
const { travelDir, getEntries, getEntireName, getReplParams } = require('./tools/helps');

const dll = getReplParams('dll');
const useDll = dll && dll[0];

if ( useDll !== 'off' ) {
  console.log('当前开发环境编译已开启dll模式，如果需要关闭，请运行 npm run open:src -- --dll=off');
  if ( !fs.existsSync('./src/.cache/dll.dllVendors.js')) {
    console.log('请先运行 npm run build:dll 命令');
    console.log('其作用是提前打包好node_module里依赖的库');
    process.exit(0);
  }

  console.log('-----------------------------------------------------------');
  console.log('Tips:每次依赖的模块有变动，需要再次运行 npm run build:dll 命令');
  console.log('-----------------------------------------------------------\n');
}

const p__dirname=__dirname.replace(/\\\w+$/,"");//"E:\1\2\3" 修改为 "E:\1\2"
const viewsPath = '/views/';
const dataPath = '/mocks/ftl/';
const mockPath = [];
travelDir(".."+viewsPath, mockPath);
const argvFilter = getReplParams('filter');
const getHtmlWebpackPlugin = () => {
  // generate ftl plugin
  console.log("argvFilter",argvFilter);
  console.log("mockPath",mockPath);
  const htmlWebpackPlugin = mockPath
    // skip /common/ directory
    .filter((pt) => {
      return pt.indexOf(`${path.sep}common${path.sep}`) === -1;
    })
    .filter((pt) => {
      if (argvFilter) {
        return pt.indexOf(argvFilter[0]) > -1;
      }
      return true;
    })
    .map((pt) => {
      const chunkName = getEntireName(pt);
      return new HtmlWebpackPlugin({
        filename: chunkName + '.html',
        template: pt,
        chunks: [chunkName]
      });
    });
    for(var a=0;a<htmlWebpackPlugin.length;a++){
      console.log(htmlWebpackPlugin[a]);
    }
    
  return htmlWebpackPlugin;
};
// more info: https://github.com/isaacs/node-glob
let newEntries = getEntries(['./src/entries/**/*.js'],
  ['./src/utils/webpackPublicPath', 'webpack-hot-middleware/client?reload=true']);

if ( argvFilter ) {
  let filteredNewEntries = Object.keys(newEntries)
    .filter((key) => {
      return key.indexOf(argvFilter[0]) > -1;
    })
    .reduce((obj, key) => {
      obj[key] = newEntries[key];
      return obj;
    }, {});
  if ( Object.keys(filteredNewEntries).length ) {
    console.log(`webpack config entry for ${argvFilter[0]}`);
    newEntries = filteredNewEntries;
    filteredNewEntries = null;
  }
}
console.log("newEntries",newEntries);
export default {
  "mode": process.env.NODE_ENV === "production" ? "production" : "development",
  // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps
  // and https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'cheap-module-source-map',
  entry: Object.assign(newEntries, {
    // app: [
    //   './src/utils/webpackPublicPath',
    //   'webpack-hot-middleware/client?reload=true',
    //   './src/index',
    // ]
  }),
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: `${__dirname}/dist`, // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    useDll ? null:
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./src/.cache/manifest.json") // eslint-disable-line
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
    .concat(getHtmlWebpackPlugin())
    .concat(
      useDll ? null:
        new HtmlWebpackIncludeAssetsPlugin({
          assets: '.cache/dll.dllVendors.js',
          append: false,
        })
    )
    .filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
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
      },
      {
        test: /(\.html)$/,
        use: [{
          loader: 'ejs-loader'
        }]
      },
      {
        test: /(\.ftl)$/,
        use: [{
          loader: 'ejs-loader'
        }, {
          loader: 'ftl-loader',
          options: {
            // 指定ftl模板的路径
            dataPath: dataPath,
            // 指定ftl的mock数据的路径
            templatePath: viewsPath,
          }
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
