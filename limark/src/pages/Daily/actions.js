import {request} from '../../utils/';
import { message } from 'antd';
/**
 * ActionsTypes Begin
 */
export const SET_DATA_LIST ='DAILY/SET_DATA_LIST';
export const SET_TOTAL_NUM ='DAILY/SET_TOTAL_NUM';
export const SET_CURRENT ='DAILY/SET_CURRENT';
export const SET_LIST_PARAMS ='DAILY/SET_LIST_PARAMS';
export const SET_LIST_LOADING ='DAILY/SET_LIST_PARAMS';

export const SET_SAVE_RESULT ='DAILY/SET_SAVE_RESULT';
//setCurrent,setTotalNum,getDailyList,setListParams
/**
 * ActionsTypes END
 */

const setDailyList = list => {
  return {type: SET_DATA_LIST, list};
};

const setListLoading = isLoading => {
  return {type: SET_LIST_LOADING, isLoading};
};

export const setTotalNum = totalNum => {
  return {type: SET_TOTAL_NUM, totalNum};
};

export const setCurrent = current => {
  return {type: SET_CURRENT, current};
};

export const setListParams = params => {
  return {type: SET_LIST_PARAMS, params};
};

export const setSaveResult = result => {
  return {type: SET_SAVE_RESULT, result};
};

export const getDailyList = (params = {}) => {
  params.offset=(params.current-1)*params.limit;
  delete params.current;
  return dispatch => {
    dispatch(setListLoading(true));
    request({
      url: '/api/dailylist',
      method: 'GET',
      params: params
    }).then(json => {
      dispatch(setListLoading(false));
      dispatch(setDailyList(json.data));
      dispatch(setTotalNum(json.total||json.data.length));
    }).catch(err => {
      message.error(err.message || '网络错误，请刷新~');
    });
  };
};

export const getDailyById = (id,fn) => {
  return dispatch => {
    request({
      url: '/api/daily/get',
      method: 'GET',
      params: {id}
    }).then(json => {
      if(fn){
        fn(json);
      }
    }).catch(err => {
      message.error(err.message || '网络错误，请刷新~');
    });
  };
};

export const saveDaily = (data = {},fn) => {
  return dispatch => {
    request({
      url: '/api/daily/save',
      method: 'POST',
      data: data
    }).then(json => {
      dispatch(setSaveResult(json.result));
      if(fn){
        fn(json);
      }
    }).catch(err => {
      message.error(err.message || '网络错误，请刷新~');
    });
  };
};

export const deleteDailys = (ids =[],fn) => {
  return dispatch => {
    request({
      url: '/api/daily/delByIds',
      method: 'POST',
      data: ids
    }).then(json => {
      if(fn){
        fn(json);
      }
    }).catch(err => {
      message.error(err.message || '网络错误，请刷新~');
    });
  };
};