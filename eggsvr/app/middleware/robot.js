//const httpProxy = require('http-proxy');
module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get('user-agent') || '';
    const match = options.ua.some(ua => ua.test(source));
    if (match) {
      ctx.status = 403;
      ctx.message = 'Go away, robot.';
    } else {
      await next();
    }
    // if(!app._proxy){
    //   app._proxy=httpProxy.createProxyServer({});
    // }
    // app._proxy.web(ctx.request, ctx.response, { target: 'http://106.14.172.180' });
  };
};

