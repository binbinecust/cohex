/* eslint-disable no-console */
import jsonServer from 'json-server';
import enableDestroy from 'server-destroy';
import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import { chalkSuccess } from './chalkConfig';
import { config } from '../source/config';
import { travelDir } from './helps';

let server = null;
const apiMocksPath = './mocks/api/';
const middlewares = jsonServer.defaults();
const ajaxPrefix = config.ajaxPrefix;
const mockPath = [];

function start(){
  const app = jsonServer.create();
  app.use(middlewares);
  app.use(function(req, res, next) {
    // 检查请求地址和mocks文件路径是否匹配
    for (let i = 0; i < mockPath.length; i ++) {
      const path = mockPath[i];
      const repPath = path
        .replace(/^mocks(\/|\\)api(\/|\\)(get|post|patch|delete)|(\/|\\)data\.json$/g, '')
        // 兼容windows反斜杠
        .replace(/\\/g, '/')
        // 支持NEI mock path 带:id 的写法， /_/id => /1111
        .replace(/\/_\/id/, '/\\d+');
      if ( new RegExp(repPath).test(req.originalUrl) ) {
        const obj = JSON.parse(fs.readFileSync(path));
        return res.send(obj);
      }

    }
    next();
  });
  app.use(jsonServer.rewriter({
    [`${ajaxPrefix}/`]: '/'
  }));

  server = app.listen(4000, function() {
    console.log(chalkSuccess('Mock Server is running'));
  });
  // Enhance with a destroy function
  enableDestroy(server);
}

if ( !fs.existsSync(apiMocksPath) ) {
  console.log('not find api-mocks directory, please run nei build first');
} else {
  travelDir(apiMocksPath, mockPath);
  start();
}
