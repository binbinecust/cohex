/* eslint-disable no-console */
import debug from 'debug';

export const appError = debug('app:error');
export const appLog = debug('app:log');

/**
 * @module utils/log
 */
/**
 * @method 记录js error并发送到服务端日志服务器
 * @param message {String} 错误信息
 * @param source {String} 错误来源页面url
 * @param lineno {Number} 错误所在行号
 * @param colno {Number} 错误所在列号
 * @param error {Object} Error对象
 * @param error.message {String} 错误信息
 * @param error.stack {String} 错误堆栈
 */
export const logToServer = (message, source, lineno, colno, error) => {
  const logToServer = window.onerror;
  // 基于前端监控sdk在window.onerror绑定的事件处理函数，上报js error
  // sdk地址：'/source/vendor/js/lib/napm-web-min-1.1.6.js'
  if (typeof logToServer === 'function') {
    try {
      // 加载了apm SDK@1.1.6版本之后,（其他版本没有经过测试，勿用）SDK会在window.onerror中注入上报错误方法
      // 因而调用该方法后可以实现上报错误功能
      logToServer(message, source, lineno, colno, error);
    } catch (e) {
      console.error('React componentDidCatch error logToServer occur error');
    }
  }
};
