export * from '../components/utils';

import { timestamp2date, text2json} from '../components/utils';

//通用方法，放在这里

/**
 * 数据报表呼入、呼出数据用到的时间转换函数
 * @param {Number} value 
 * @param {Number} interval 
 */
export const dateSpan = (value, interval) => {
  if (value === undefined) return '-';
  let time = new Date(value),
    now = new Date(),
    _time = new Date(value).setHours(0, 0, 0, 0),
    _now = new Date().setHours(0, 0, 0, 0),
    duration = 24 * 60 * 60 * 1000;
  let endTime;
  if(interval == 0 || interval == 1){
    if(interval == 0){                                //半小时
      endTime = new Date(value + 30 * 60 * 1000);
    }else{                                            //小时
      endTime = new Date(value + 60 * 60 * 1000);
    }
    if (_now - _time == 0) {
      return '今天 ' + timestamp2date(time, 'HH:mm') + '~' + timestamp2date(endTime, 'HH:mm');
    } else if (_now - _time == duration) {
      return '昨天 ' + timestamp2date(time, 'HH:mm') + '~' + timestamp2date(endTime, 'HH:mm');
    } else if (_now - _time > duration && time.getYear() == now.getYear()) {
      return timestamp2date(time, 'MM-dd HH:mm') + '~' + timestamp2date(endTime, 'HH:mm');
    } else {
      return timestamp2date(time, 'yyyy-MM-dd HH:mm') + '~' + timestamp2date(endTime, 'HH:mm');
    }  
  }else{                                                //天
    if (_now - _time == 0) {
      return '今天';
    } else if (_now - _time == duration) {
      return '昨天';
    } else if (_now - _time > duration && time.getYear() == now.getYear()) {
      return timestamp2date(time, 'MM-dd');
    } else {
      return timestamp2date(time, 'yyyy-MM-dd');
    }  
  }  
};

/**
 * 预约回呼 - 待回呼数量格式化函数
 * @param {Number} value 
 */
export const formatTodayCount = (data) => {
  let count;
  if(data > 0){
    let k = data / 1000,
        kk = data / 1000 / 100;
    // 1千 到 1000 千
    if (k >= 1 && kk < 10) {
      count =  Math.floor(k) + 'K';
    }else if (kk >= 10) { // 大于等于 1000千
      count = '999K';
      // 小于 1000
    } else {
        count = data;
    }
  }else {
    count = '';
  }
    return count;
};

export const formatOnlineSession = (session) => {
  if (session.category.id === -100) {
    session.category = {};
  }
  if (!session.kefu.portrait) session.kefu.portrait = 'http://qiyukf.com/prd/res/img/avator/default.png';
  return session;
};

export const formatMsgList = (list, session) => {
  list.sort((a, b) => (a.time > b.time ? 1 : -1));
  list.forEach((item) => {
    item.kefu = session.kefu || {};
    formatMsgItem(item, session);
  });
  return list;
};

export const formatMsgItem = (item) => {
  if (!item.content) {
    item.type = 'empty';
    return;
  }
  switch (item.type) {
    case 'image': {
      item.content = text2json(item.content);
      // format image url
      let url = item.content && item.content.url || '';
      if ((url.indexOf('nos.netease.com') >= 0 || url.indexOf('nosdn.127.net') >= 0) && url.indexOf('?') < 0) {
        item.content.origin = url;
        item.content.url = url + '?imageView&thumbnail=1500x850';
        item.content.thumb = url + '?imageView&thumbnail=120x120';
      }
      break;
    }
    case 'file':
    case 'video': {
      item.content = text2json(item.content);
      break;
    }
    case 'audio': {
      item.content = text2json(item.content);
      let url = item.content.url || '';
      if ((url.indexOf('nos.netease.com') >= 0 || url.indexOf('nosdn.127.net') >= 0)) {
        url += (url.indexOf('?') < 0 ? '?' : '&')
          + 'audioTrans&type=mp3';
        item.content.url = url;
      }
      break;
    }
    case 'richtext': {
      item.content = (text2json(item.content) || {}).content;
      break;
    }
    default:

  }
};