/**
 * 数字相关的通用方法
 */

import _ from 'lodash';

/**
 * 把数值转化为百分比的字符串
 * @param  {Number} value         要转化的数值
 * @param  {Number} [fix=1]       保留的位数
 * @param  {String} [format='--']  值不存在时，显示的内容
 * @return {String}
 */
export const number2ratio = (value, fix = 1, format = '--') => {

  if (value === undefined || value == -1) {
    return format;
  } else if (value * 100 > 999) {
    return '>999%';
  } else {
    return (value * 100).toFixed(fix) + '%';
  }
};

/**
 * 不满两位的整数，左侧补一个零
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export const paddingZero = (value) => {
  return _.padStart(value, 2, '0');
};

/**
 * 把数值转化为文本展示的字符串
 * @param  {Number} value         要转化的数值
 * @param  {Number} [fix=2]       保留的位数 默认保留两位
 * @param  {String} [format='--']  值不存在时，显示的内容
 * @return {String}
 */
export const number2fixed = (value, fix = 2, format = '--') => {

  if (value == -1) {
    return format;
  }
  let w = value / 10000,
    remain = value % 10000,
    ww = value / 10000 / 1000;

  // 1万 到 1000 万
  if (w >= 1 && ww < 1) {
    if (remain == 0) {
      return w + '万';
    } else {
      return w.toFixed(fix) + '万';
    }
    // 大于 1000 万
  } else if (ww >= 1) {
    return Math.round(value / 10000) + '万';
    // 小于 1万
  } else {
    return value;
  }
};

/**
 * 默认的时长格式化函数 不对外暴露
 * @param  {[type]} hours                    [description]小时数
 * @param  {[type]} minutes                  [description]分钟数
 * @param  {[type]} seconds                  [description]秒数
 * @param  {String} [format='HH小时mm分ss秒']  [description] 默认格式  年：yyyy 月：MM 天：dd 小时：HH 分：mm 秒：ss
 * @return {[type]}                          [description] eg. 0,0,0=>'0秒'  0,1,15=>'1分15秒' 34,56,0=>'34小时56分0秒'
 */
const durationformatter = ({
  hours,
  minutes,
  seconds
}, format = 'HH小时mm分ss秒') => {
  let map = {
    HH: hours,
    mm: minutes,
    ss: seconds
  };

  format = format.replace(/(yyyy)|(MM)|(dd)|(HH)|(mm)|(ss)/g, function(value) {
    return map[value];
  }).match(/[1-9].*/);

  if (format)
    return format[0];

  return '0秒';
};

/**
 * 工作报表中使用的特殊格式化函数，当小时数大于1时，不显示秒
 * @param  {[type]} hours   [description]
 * @param  {[type]} minutes [description]
 * @param  {[type]} seconds [description]
 * @return {[type]}         [description]
 */
export const durationformatterStatistics = ({hours, minutes, seconds}) => {

  return hours >= 1
    ? durationformatter({
      hours,
      minutes,
      seconds
    }, 'HH小时mm分')
    : durationformatter({hours, minutes, seconds});

};

/**
 * 把时长的数值转化为时长
 * @param  {Number} value         要转化的数值
 * @param  {Function} [formatter=durationformatter]  格式化显示的函数
 * @return {String}
 */
export const number2duration = (value, formatter = durationformatter) => {

  if (isNaN(value) || value <= 0)
    return '--';

  const hours = Math.floor(value / (1000 * 60 * 60));
  value = value - hours * (1000 * 60 * 60);
  const minutes = Math.floor(value / (1000 * 60));
  value = value - minutes * (1000 * 60);
  const seconds = Math.floor(value / 1000);

  return formatter({hours, minutes, seconds});

};
