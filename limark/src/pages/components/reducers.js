/**
 * components 的reducers。所有业务组件的reducers放里
 */

import {combineReducers} from 'redux';
import {
  SET_DIDLIST
} from './actions';


const DidList = (state = {
  list: [],
  set: new Set(),
  loading: false,
}, action) => {
  switch (action.type) {
    case SET_DIDLIST:
      return {...state, ...action.value};
    default:
      return state;
  }
};


const components = combineReducers({DidList});

export default components;
