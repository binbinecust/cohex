'use strict';

var proxy = require('http-proxy-middleware');
  
 
  
  // proxy 中间件的选择项
  var options = {
         target: 'http://106.14.172.180', // 目标服务器 host
         //  changeOrigin: true,               // 默认false，是否需要改变原始主机头为目标URL
         //  ws: true,                         // 是否代理websockets
         // pathRewrite: {
         //     '^/api/old-path' : '/api/new-path',     // 重写请求，比如我们源访问的是api/old-path，那么请求会被解析为/api/new-path
         //     '^/api/remove/path' : '/path'           // 同上
         // },
         // router: {
         //     // 如果请求主机 == 'dev.localhost:3000',
         //     // 重写目标服务器 'http://www.example.org' 为 'http://localhost:8000'
         //     'dev.localhost:3000' : 'http://localhost:8000'
         // }
     };
 
    //创建代理
    var exampleProxy = proxy("/api",options);
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/limark/daily', controller.home.index);
  // router.get('/api/dailylist', controller.daily.dailylist);
  // router.get('/api/daily/get', controller.daily.get);
  // router.get('/api/daily/save', controller.daily.save);
  // router.get('/api/daily/delByIds', controller.daily.delByIds);
  router.get('/news', controller.news.list);
  router.get('/gq', controller.news.gq);
  router.get('/api',exampleProxy);
};
