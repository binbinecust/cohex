import {combineReducers} from 'redux';
import {
  SET_DATA_LIST,
  SET_LIST_LOADING,
  SET_TOTAL_NUM,
  SET_CURRENT,
  SET_LIST_PARAMS,
  SET_SAVE_RESULT
} from "./actions";

const DailyList = (state = {
    list: [],
    isLoading: true,
    totalNum: null,
    current: 1,
    params: {},
    listRefreshFlag:0
  }, action) => {
  switch (action.type) {
    case SET_DATA_LIST:
        return {...state, list: action.list,listRefreshFlag:(new Date()).getTime()};
    case SET_LIST_LOADING:
        return {...state, isLoading: action.isLoading};
    case SET_TOTAL_NUM:
        return {...state, totalNum: action.totalNum};
    case SET_CURRENT:
        return {...state, current: action.current};
    case SET_LIST_PARAMS:
        return {...state, params: action.params};
    default:
      return state;
  }

};

const Daily = (state = {
    saveResult: null,
    daily:null
}, action) => {
  switch (action.type) {
    case SET_SAVE_RESULT:
        return {...state, result: action.result};
    default:
      return state;
  }

};

export default combineReducers({Daily,DailyList});
