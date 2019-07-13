 
  module.exports = {
    // framework 支持 `js`,`html`, `vue`, `react`, `weex`
    //framework: 'react' ,
    entry:{ 
        app: 'view/app.js'
        //index: 'app/web/page/index.js'
    },
    // output: {
    //     path: `${__dirname}/static`, // Note: Physical files are only output by the production build task `npm run build`.
    //     publicPath: '/',
    //     filename: '[name].js'
    // },
    //template: 'src/view/layout.html' ,
    // loaders:{
    //   // 默认可以不用配置, 添加或扩展请见配置loaders章节  
    // },
    // pugins:{
    //   // 默认可以不用配置, 添加或扩展请见配置loaders章节  
    // },
    // customize(webpackConfig){ // 非必须
    //   // 此处 webpackConfig 为原生的 webpackconfig, 你可以进行加工处理
    //   return webpackConfig;
    // },
    // done(){
    //   // Webpack 编译完成回调, 默认可以不用配置,当你需要编译完成做某某事情(比如上传cdn)才需要配置
    // }
  }