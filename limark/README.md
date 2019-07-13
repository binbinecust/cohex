#样板工程

## 特性

- Babel with ES6
- Hot reloading
- Testing
- Linting
- Local mock server
- Working example app

## 环境设置


## 构建项目


## Get Started

  Install npm(or cnpm) package
  ```
  $ npm install
  ```

  Update mock data from NEI，replace this_is_your_project_uuid
  ```
  $ nei update -k this_is_your_project_uuid
  ```

  Start development in your default browser
  ```
  $ npm start
  ```

  Run the local mock service
  ```
  $ nei server
  ```

  Build scripts ``````and css etc. mode 表示打包环境 默认值为test。online:线上 release:预发 test:测试服 debug:开发环境
  ```
  $ npm run build

  $ npm run build -- --mode=this_is_mode
  ```

  Start production in your default browser
  ```
  $ npm run open:dist
  ```

完整命令请查阅package.json

## Links

- [ant-design](http://ant.design/)
- [react](https://github.com/facebook/react)
- [react-router](https://github.com/reactjs/react-router)
- [react-router-redux](https://github.com/reactjs/react-router-redux)
- [redux](https://github.com/reactjs/redux)
- [redux-devtools](https://github.com/gaearon/redux-devtools)
- [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor)
- [NEI](https://nei.netease.com/)
- [WebPack](http://webpack.github.io/docs/)
- [Less](https://github.com/less/less.js)
- [Jest](https://facebook.github.io/jest/)
- [enzyme](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md)
- [debug](https://github.com/visionmedia/debug)

## Pages Demo

run npm start and open [Pages Demo](http://localhost:8000/login/) on browser

## The directory structure

```
.
├── /dist/                    # 构建输出的文件会在这里
├── /node_modules/            # 第三方类库和工具
├── /source/                  # 应用源码
│ ├── /components/            # React components
│ ├── /config/                # 环境变量配置文件
│ ├── /entries/               # 多页打包入口目录
│ ├── /middleware/            # 业务层中间件,处理日志、打点等公共业务逻辑
│ ├── /pages/                 # 页面入口文件
│ | └── /common/              # 页面公共文件,布局等
│ | | ├── /Echart/             # 图表公共业务模块
│ | | ├── /MenuNav.js         # 导航模块
│ | | ├── /MenuNav.less       # 导航模块 样式
│ | | └── /Todo.js            # 待开发页面公共占位使用
│ | └── /components/          # 全局公用的组件
│ | ├── /actions.js           # 全局公用的 actions
│ | ├── /reducers.js          # 全局公用的 reducers
│ | ├── /constants.js         # 全局公用的 约束常量
│ | ├── /routes.js            # 全局 路由配置
│ | ├── /app.js               # 应用入口
│ | ├── /app.less             # 应用入口 样式
│ | ├── /Root.js              # 根节点
│ | ├── /Root.prod.js         # 根节点 生产环境
│ | └── /Root.dev.js          # 根节点 开发环境
│ ├── /store/                 # store
│ ├── /utils/                 # 工具函数
│ └── /vendor/                # 不需要编译的静态资源文件，在生产环境可以使用publicPath路径引用
├── ---/tools/                   # 项目运行脚本
├── ---/views/                   # java freeMarker 文件
├── /src/                     # 后端使用目录 配置路由等
├── .babelrc                  # babel配置文件, https://babeljs.io/docs/usage/babelrc/
├── .editorconfig             # 代码风格配置文件, http://editorconfig.org
├── .eslintrc                 # eslint配置文件, http://eslint.cn/docs/user-guide/configuring
├── .eslintignore             # eslint配置文件, http://eslint.cn/docs/user-guide/configuring
├── .gitignore                # git配置文件, https://help.github.com/articles/ignoring-files/
├── package.json              # 配置入口文件地址、依赖和 scripts
├── postcss.config.js         # postcss配置文件, https://github.com/postcss/postcss-loader
├── README.md                 # 项目说明文件
├── ---tsconfig.json             # 编译组件库使用的typcscript配置文件
├── webpack.config.dev.js     # webpack开发环境配置
└── webpack.config.prod.js    # webpack生产环境配置
```

## Coding styles
- javascript: use eslint:recommended, see https://eslint.org/docs/rules/ and .eslintrc file for more details
- directory、html、css、js: named using hump form
- react component and react container: named using hump form and uppercase characters at the beginning
- test file: named with Component + .test + .js format
- css: https://nsfi.github.io/blog/2017/12/06/Less%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83/

#遇到的坑
以下三个目录格式要保持一致，否则自动生成的HTML文件，将没有打包后的具体业务的js文件，比如“<script src="/daily/daily.js"></script>”
views/daily/daily.ftl
mocks/ftl/daily/daily.json
src/entries/daily/daily.js

srcServer.js里的urlConfig.realPath="daily/daily.html" 也要与“views/daily/daily.ftl”目录对应，否则访问不到页面，因为这个文件目录根据后者自动创建的;

