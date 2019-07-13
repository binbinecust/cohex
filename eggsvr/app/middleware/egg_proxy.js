
var httpProxy = require('http-proxy');
module.exports = (options,app) => {
  //var proxy = require('http-proxy-middleware');
  
 
  
  // // proxy 中间件的选择项
  // var options = {
  //        target: 'http://106.14.172.180', // 目标服务器 host
  //        //  changeOrigin: true,               // 默认false，是否需要改变原始主机头为目标URL
  //        //  ws: true,                         // 是否代理websockets
  //        // pathRewrite: {
  //        //     '^/api/old-path' : '/api/new-path',     // 重写请求，比如我们源访问的是api/old-path，那么请求会被解析为/api/new-path
  //        //     '^/api/remove/path' : '/path'           // 同上
  //        // },
  //        // router: {
  //        //     // 如果请求主机 == 'dev.localhost:3000',
  //        //     // 重写目标服务器 'http://www.example.org' 为 'http://localhost:8000'
  //        //     'dev.localhost:3000' : 'http://localhost:8000'
  //        // }
  //    };
 
    // 创建代理
    //var exampleProxy = proxy(["/api"],options);
    
    return async function proxyMiddleware(ctx, next) {
      // var proxy = httpProxy.createProxyServer({});
      // if(ctx.request.url.indexOf("/api/")){
      //    proxy.web(ctx.request, ctx.response, { target: 'http://106.14.172.180' },(err)=>{
      //     console.log(err);
      //   });
      //   proxy.on('error', function(e) {
      //     console.log(e);
      //   });
      // }else{
      //   await next();

      // }
      await next();

    };
};
