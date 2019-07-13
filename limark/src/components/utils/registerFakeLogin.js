// 在开发环境提供模拟ajax登录方法，注册到window中
// 注册方法: 建议在业务代码Root.dev.js中require('../bizCommon/qiyu/utils/registerFakeLogin.js');
// 使用方法：在console控制台通过fakeLogin('用户名', '密码')使用
import axios from 'axios';
import md5 from 'crypto-js/md5';
import queryString from 'query-string';
import {message} from 'antd';

const instanceForm = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
const fakeLogin = (username, password) => {
  return instanceForm({
    url: '/api/kefu/login/',
    method: 'POST',
    data: queryString.stringify({
      username,
      password: md5(password),
      autoLogin: 'on',
      terminalType: 0,
    }),
  }).then((response) => {
    const json = response.data;
    if (json.code === 200) {
      message.success('登录成功');
    } else if (json.code === 8102) {
      message.success('密码错误次数过多，请稍后再试');
    } else {
      message.error(json.message);
    }
  }).catch(e => {
    message.error(e);
  });
};
if (process.env.NODE_ENV !== 'production') {
  top.fakeLogin = fakeLogin;
}
