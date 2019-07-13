// ajax 辅助方法
import axios from 'axios';
import debug from 'debug';
import {message} from 'antd';
import queryString from 'query-string';
//import { iframeWrapper } from './iframeWrapper';

import {object2query} from './type2type';

const ajaxError = debug('ajax:error');
const ajaxLog = debug('ajax:log');

const defaultConfig = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};
const formConfig = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

//const iframer = iframeWrapper(window.top);

//通用方法，放在这里
const instance = axios.create(defaultConfig);
const instanceForm = axios.create(formConfig);
const cache = {}; //缓存请求的实例。key为url+params，所以当请求的参数一样时，不需要再次发送请求。
/**
 * 基于Promise的ajax请求接口
 * @param {Object} param 参考axios的config
 * @param {String} param.url
 * @param {String} param.method
 * @param {String} param.params 请求参数
 * @param {Boolean} param.rest 是否是rest请求
 * @param {Boolean} param.form 是否使用headers: {'Content-Type': 'application/x-www-form-urlencoded'}
 * @param {Boolean} param.useMessageError 是否使用message.error显示错误信息

 * @return {Promise}
 */
export function request(param) {

  window.setting && window.setting.token
    ? param.url += `?token=${window.setting.token}`
    : param.url += '';

  // 如果是rest请求，使用data参数。
  if ( param.rest ) {
    param.data = param.params;
    delete param.params;
    // 如果不是rest请求，对params参数进行格式化
  } else {
    Object.assign(param, {
      paramsSerializer: (params) => {
        return object2query(params);
      }
    });
  }
  // 默认开启param.useMessageError
  if ( !('useMessageError' in param) ) {
    param.useMessageError = true;
  }
  // 如果是form提交方式，对data参数进行格式化
  if ( param.form ) {
    param.data = queryString.stringify(param.data);
  }

  return new Promise((resolve, reject) => {

    const success = response => {
      const data = response.data;
      const code = data.code;
      if (code == 200) {
        resolve(data);
      } else {
        // // 未登录或已超时、不存在或已停用企业
        // if ((code == 4001 || code == 8001) && typeof iframer.postMessage == 'function' ) {
        //   iframer.postMessage({method: 'logout'});
        // }

        // 调用成功后的异常，code!= 200，显示错误原因，reject({code, message})
        if ( param.useMessageError && data.message ) {
          message.error(data.message);
        }
        reject(data);
      }
    };
    const fail = error => {
      if (axios.isCancel(error)) {
        ajaxLog(`ajax请求${param.url}被取消`, error);
        return;
      }
      const errorMesg = error.response && error.response.data || '请求失败，请稍后再试';
      // 因网络等原因调用不成功，显示错误原因，reject({code, message})
      message.error(errorMesg);
      reject({
        code: -1,
        message: errorMesg
      });
    };

    let key = param.url + ':' + object2query(param.params);

    if (param.cache && cache[key]) {
      cache[key].then(success, fail);
      return;
    }
    let createRequest;

    if ( param.form ) {
      createRequest = instanceForm;
    } else {
      createRequest = instance;
    }

    let request = createRequest(param);
    request.then(success, fail);

    if (param.cache) {
      cache[key] = request;
    }

  });
}

// request({form: true})方法的语法糖
export function requestForm(param) {
  return request(Object.assign({}, param, {
    form: true
  }));
}
