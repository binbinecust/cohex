import * as dev from './dev';
import * as prod from './prod';

import * as utils from '../utils';

// 着陆页
const adminHome = '/limark/';
//const chatHome = '/chat/callcenter/page/';

//管理端二级导航所有菜单
const ADMIN_MENUS = {
  MENU_DAILY: {
    name: '日常管理',
    key: 'daily',
    url: `${adminHome}daily`
  }
 };
const common = {
  // 管理端所有网站路由
  ADMIN_ROUTES: {
    HOME: `${adminHome}`,
    DAILY: ADMIN_MENUS.MENU_DAILY.url,
    
  },
  MENUS:[
    ADMIN_MENUS.MENU_DAILY
  ]
  // //客服端所有网站路由
  // CHAT_ROUTES: {
  //   HOME: `${chatHome}`,
  //   PERSONALREPORT: CHAT_MENUS.MENU_PERSONALREPORT.url,
  //   HISTORY: CHAT_MENUS.MENU_HISTORY.url,
  //   CALLTASK: CHAT_MENUS.MENU_CALLTASK.url,
  //   CALLTASK_DETAIL: `${CHAT_MENUS.MENU_CALLTASK.url}detail`,
  //   MONITOR: CHAT_MENUS.MENU_MONITOR.url,
  //   CALLBACK: CHAT_MENUS.MENU_CALLBACK.url,
  //   UNSUBCOMMITED: `${chatHome}unsubcommited`
  // },
  // ADMIN_MENUS: REAL_ADMIN_MENUS,
  // CHAT_MENUS: REAL_CHAT_MENUS
};

export const config = (
  process.env.NODE_ENV === 'production'
    ? Object.assign(common, prod)
    : Object.assign(common, dev));
