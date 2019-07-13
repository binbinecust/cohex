/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
//console.error(__dirname);//增加这样的代码执行start命令时有错误
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  const p_basedir=__dirname.replace("\\eggsvr\\config","");
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_123456';
  config.cluster = {
    listen: {
      port: 8080,
      hostname: '127.0.0.1'
      // path: '/var/run/egg.sock',
    }
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  /**
   * 自定义中间件配置，引入第三方中间件不需要在这里添加
   */
  config.middleware = [
    'robot','graphql'
  ];

  // robot's configurations
  config.robot = {
    ua: [
      /Baiduspider/i,
    ],
  };
  //自定义代理插件
  config.eggProxy = {
      rules: [
          {
              proxy_location: '/api', // redirect url
              proxy_pass: 'http://106.14.172.180', // target origin
          }
      ],
      body_parse: true,
      proxy_timeout: 3000,
      gzip: true // default value is true
  };
  //第三方插件，基于 http-proxy和http-proxy-middleware
  config.httpProxy = {
    '/api': 'http://106.14.172.180'
  };
  /**
   * WEB服务配置信息
   */
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.htm': 'nunjucks',
      '.js': 'react',
      '.jsx': 'react',
    },
  };

  config.static = {
    prefix: '/',
    dir: path.join(p_basedir, 'publish/static'),
  };

  config.reactssr = {
    //layout: path.join(app.baseDir, 'app/web/view/layout.html')
    // doctype: '<!doctype html>',
    // layout: path.join(app.baseDir, 'app/view/layout.js'),
    // manifest: path.join(app.baseDir, 'config/manifest.json'),
    // injectHeadRegex: /(<\/head>)/i,
    // injectBodyRegex: /(<\/body>)/i,
    // injectCss: true,
     injectJs: false,
    // crossorigin: false,
    // injectRes: [],
    // mergeLocals: true,
    // fallbackToClient: true, // fallback to client rendering if server render failed
    // afterRender: (html, context) => { /* eslint no-unused-vars:off */
    //   return html;
    // },
  };
  config.mongodb = {
      app: true,
      agent: false,
      // username: '',
      // password: '',
      // hosts: '127.0.0.1:27017',
      // db: 'limark',
      // query: ''
      defalut: {
          username: '',
          password: '',
          hosts: '127.0.0.1:27017',
          db: 'limark',
          query: ''
      },
      client: {
          username: '',
          password: '',
          hosts: '127.0.0.1:27017',
          db: 'limark',
          query: ''
      }
  };
  /**
   * 业务配置信息
   */
  config.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };
  return {
    ...config,
    ...userConfig,
  };
};
