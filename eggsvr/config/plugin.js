'use strict';
const path = require('path');
/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },

  reactssr: {
    enable: true,
    package: 'egg-view-react-ssr',
  },

  mongodb :{
    enable: true,
    // feel free to make some local change, and require it like this.
    // path: your_local_folder_path
    package: 'egg-mongodb'
  },

  graphql :{
    enable: true,
    package: 'egg-graphql',
  },

  httpProxy:{
    enable: true,
    package: 'egg-http-proxy',
  },

  reghelp: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/reghelp'),
  },
};
