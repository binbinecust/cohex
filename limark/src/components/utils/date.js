/**
 * 所有与时间相关的通用方法写这里
 * @type {[type]}
 */

import {paddingZero} from './number';

/**
 * 一天的时间长度
 * @type {[type]}
 */
export const DAY = 24 * 60 * 60 * 1000;
/**
 * 一周的时间长度
 * @type {[type]}
 */
export const WEEK = 7 * DAY;
export const MONTH = 30 * DAY;
export const YEAR = 365 * DAY;

export const WEEK_MAP = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六'
];

/**
 * 某时刻的当天零点，也就是一天的开始
 * @param {Date} [time=new Date()] [description]
 */
export const DAY_BEGIN = (time = new Date()) => {
  if (Number.isInteger(time)) time = new Date(time);
  time.setHours(0, 0, 0, 0);
  return time;
};

/**
 * 某时刻的当天23:59:59，也就是一天的结束
 * @param {Date} [time=new Date()] [description]
 */
export const DAY_END = (time = new Date()) => {
  if (Number.isInteger(time)) time = new Date(time);
  time.setHours(23, 59, 59, 999);
  return time;
};

/**
 * 获取过去一天的开始时间和结束时间
 * @return {Array.Date} [00:00:00,23:59:59:999]
 */
export const pastDay = () => {
  return [
    DAY_BEGIN(new Date(Date.now() - DAY)),
    DAY_END(new Date(Date.now() - DAY))
  ];
};
/**
 * 获取过去一周的起止时间
 * @return {[type]} [description]
 */
export const pastWeek = () => {
  return [
    DAY_BEGIN(new Date(Date.now() - WEEK)),
    DAY_END(new Date(Date.now() - DAY))
  ];
};
/**
 * 获取过去30天的起止时间
 * @return {[type]} [description]
 */
export const pastMonth = () => {
  return [
    DAY_BEGIN(new Date(Date.now() - MONTH)),
    DAY_END(new Date(Date.now() - DAY))
  ];
};

/**
 * 获取过去一年的起止时间
 * @return {[type]} [description]
 */
export const pastYear = () => {
  return [
    DAY_BEGIN(new Date(Date.now() - YEAR)),
    DAY_END(new Date(Date.now() - DAY))
  ];
};

/**
 * 获取当前一天的开始时间和结束时间
 * @return {Array.Date} [00:00:00,23:59:59:999]
 */
export const today = () => {
  return [
    DAY_BEGIN(new Date(Date.now())),
    DAY_END(new Date(Date.now()))
  ];
};

/**
 * 获取全部的起止时间，包括今天
 */
export const alltime = () => {
  return [
    new Date('2015/9/1 0:0:0'),
    DAY_END(new Date(Date.now()))
  ];
};

/**
 * 获取全部的起止时间，不包括今天
 */
export const pastAlltime = () => {
  return [
    new Date('2015/9/1 0:0:0'),
    DAY_END(new Date(Date.now() - DAY))
  ];
};

/**
 * 获取最近7天的起止时间，包括今天
 */
export const lastWeek = () => {
  return [
    DAY_BEGIN(new Date(Date.now() - WEEK + DAY)),
    DAY_END(new Date(Date.now()))
  ];
};
/**
 * 获取最近30天的起止时间，包括今天
 * @return {[type]} [description]
 */
export const lastMonth = () => {
  return [
    DAY_BEGIN(new Date(Date.now() - MONTH + DAY)),
    DAY_END(new Date(Date.now()))
  ];
};

/**
 * 获取最近一年的起止时间，包括今天
 * @return {[type]} [description]
 */
export const lastYear = () => {
  return [
    DAY_BEGIN(new Date(Date.now() - YEAR + DAY)),
    DAY_END(new Date(Date.now()))
  ];
};
/**
 * 是否是今天
 * @param  {[type]}  time [description]
 * @return {Boolean}      [description]
 */
export const isToday = time => {
  return timestamp2date(time, 'yyyy-MM-dd') === timestamp2date(+ new Date(), 'yyyy-MM-dd');
};

/**
 * 是否是昨天
 * @param  {[type]}  time [description]
 * @return {Boolean}      [description]
 */
export const isYesterday = time => {
  return timestamp2date(time, 'yyyy-MM-dd') === timestamp2date(+ new Date() - DAY, 'yyyy-MM-dd');
};

/**
 * 时间段选择组件，默认使用的快捷选项
 * @type {Array}
 */
export const defaultShortcuts = [
 {
    text: '昨天',
    section: pastDay()
  }, {
    text: '过去7天',
    section: pastWeek()
  }, {
    text: '过去30天',
    section: pastMonth()
  }
];

/**
 * 获取一天24小时的时间标签
 * @return {[type]} [description]
 */
export const day2hourlable = () => {
  const hoursLabel = [];
  for (let i = 1; i < 25; i++)
    hoursLabel.push(i + ':00');

  return hoursLabel;
};

/**
 * 根据起止时间，转为按天的时间标签
 * @param  {[type]} startTime [description]
 * @param  {[type]} endTime   [description]
 * @return {[type]}           [description]
 */
export const timesection2daylabel = (startTime, endTime) => {
  const dayLabels = [];
  let format = 'MM/dd';
  const len = Math.ceil((endTime - startTime) / DAY); //时间区间一共跨越多少天

  if (crossYears(startTime, endTime)) { //如果跨越年了，显示年的标签
    format = 'yyyy/MM/dd';
  }

  for (let l = 0; l < len; l++) {
    dayLabels.push(timestamp2date((startTime + l * DAY), format));
  }

  return dayLabels;
};

/**
 * 判断两个时间戳是否跨年了
 * @param  {[type]} startTime [description]
 * @param  {[type]} endTime   [description]
 * @return {[type]}           [description]
 */
export const crossYears = (startTime, endTime) => {
  return new Date(endTime).getFullYear() !== new Date(startTime).getFullYear();
};

/**
 * 时间戳转为日期的格式
 * @param value
 * @param format  可选 默认 'yyyy-MM-dd HH:mm'
 * @returns {*}
 */
export const timestamp2date = (value, format = 'yyyy-MM-dd HH:mm') => {

  if (!value)
    return "--";

  let maps = {
    'yyyy': function(date) {
      return date.getFullYear();
    },
    'MM': function(date) {
      return paddingZero(date.getMonth() + 1);
    },
    'dd': function(date) {
      return paddingZero(date.getDate());
    },
    'HH': function(date) {
      return paddingZero(date.getHours());
    },
    'mm': function(date) {
      return paddingZero(date.getMinutes());
    },
    'ss': function(date) {
      return paddingZero(date.getSeconds());
    }
  };

  let trunk = new RegExp(Object.keys(maps).join('|'), 'g');

  value = new Date(value || + new Date());

  return format.replace(trunk, function(capture) {
    return maps[capture]
      ? maps[capture](value)
      : '';
  });
};

/**
 * 时间戳转为固定日期格式：今年显示'MM-dd HH:mm',非今年显示'yyyy-MM-dd HH:mm'
 * @param value
 * @returns {*}
 */
export const timestamp2fixedDate = (value) => {

    if (!value)
      return "--";

    let nowTime = new Date().getTime();
    if(crossYears(value,nowTime)){  //跨年
      return timestamp2date(value);
    }else{
      return timestamp2date(value,'MM-dd HH:mm');
    }
  };

/**
 * 时间戳转为固定日期格式：今年显示'MM-dd HH:mm',非今年显示'yyyy-MM-dd HH:mm',今天显示'今天 HH:mm',昨天显示'昨天 HH:mm'
 * @param value
 * @returns {*}
 */
export const timestamp2fixedDate1 = (value) => {

  if (!value)
    return "--";

  let nowTime = new Date().getTime();
  let nowYear = new Date().getFullYear();
  let nowMonth = new Date().getMonth();
  let nowDate = new Date().getDate();
  let newValue = new Date(value);
  if(crossYears(value,nowTime)){  //跨年
    return timestamp2date(value);
  }else if(nowYear===newValue.getFullYear() && nowMonth===newValue.getMonth() && nowDate===newValue.getDate()){   //同日
    return `今天 ${timestamp2date(value,'HH:mm')}`;
  }else if(nowYear===newValue.getFullYear() && nowMonth===newValue.getMonth() && nowDate===newValue.getDate()+1){ //昨日
    return `昨天 ${timestamp2date(value,'HH:mm')}`;
  }else {
    return timestamp2date(value,'MM-dd HH:mm');
  }
};
