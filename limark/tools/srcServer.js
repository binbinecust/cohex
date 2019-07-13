// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
import browserSync from 'browser-sync';
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proxy from 'http-proxy-middleware';
import webpackConfig from '../webpack.config.dev';
import { modifyNeiServerPort } from './helps';
import path from 'path';

const bundler = webpack(webpackConfig);
const ajaxPrefix = ['/api'];
const neiServerPort = 8000;

const upcaseFirstChar = (name) => {
  if (!name || typeof name != 'string') {
    return '';
  }
  return name.replace(/^\w/, function (a) {
    return a.toUpperCase();
  });
};
const apiProxy = proxy(ajaxPrefix, {
  target: 'http://localhost:'+neiServerPort,
  changeOrigin: true,
  ws: true
});

//modifyNeiServerPort(path.resolve(__dirname, '../nei.37075.c413102d5ee5978b48a4c01e0590faed/server.config.js'), neiServerPort);

// 配置开发环境下的虚拟路径到物理路径的url path映射
const urlConfig = [
  {
    virtualPath: '/limark/',
    realPath: '/daily/daily.html'//这个配置和 views/daily/daily.ftl  对应
  },
  {
    virtualPath: '/limark/daily',
    realPath: '/daily/daily.html'//这个配置和 views/daily/daily.ftl  对应
  }
];

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  server: {
    baseDir: 'src'
  },
  middleware: [
    apiProxy,
    // 处理开发环境下虚拟路径到物理路径的url path映射
    function(req, res, next) {
      // mock 服务器静态资源请求
      if (req.url.startsWith('/callcenterres')) {
        req.url = req.url.replace(/\/callcenterres/, '');
        return next();
      }
      // 直接返回js、css资源
      if (/\.js|\.css/.test(req.url)) {
        return next();
      }
      // 特殊规则的配置写在这
      if (req.url.startsWith('/callcenter/page/login')) {
        req.url = req.url.replace(/\/callcenter\/page\/login/, '/callcenter/login.html');
      // 通用规则的配置
      } else {
        for (let item of urlConfig) {
          // 处理字符串类型的配置
          if ( typeof item === 'string' ) {
            const splited = item.split('/');
            const upcaseFileName = `${splited[1]}${upcaseFirstChar(splited[2])}`;
            item = {
              virtualPath: item,
              realPath: `/${upcaseFileName}/${upcaseFileName}.html`
            };
          // 处理缺省realPath类型的配置
          } else if ( item.virtualPath && typeof item.realPath === 'undefined' ) {
            const splited = item.virtualPath.split('/');
            const upcaseFileName = `${splited[1]}${upcaseFirstChar(splited[2])}`;
            item.realPath = `/${upcaseFileName}/${upcaseFileName}.html`;
          }
          if (req.url.startsWith(item.virtualPath)){
            req.url = item.realPath;
          }
          console.log(item);
        }
      }
      return next();
    },
    webpackDevMiddleware(bundler, {
      // Dev middleware can't access config, so we provide publicPath
      publicPath: webpackConfig.output.publicPath,

      // pretty colored output
      stats: { colors: true },

      // Set to false to display a list of each file that is being bundled.
      noInfo: false,

      // for other settings see
      // http://webpack.github.io/docs/webpack-dev-middleware.html
    }),

    // bundler should be the same as above
    webpackHotMiddleware(bundler),
  ],

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'src/*.html'
  ],
  open: false
});
