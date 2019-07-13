/**
 * 顶层Reducers
 */

import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';


const app = {
  component: {
  }
};

// 设置公共组件数据
const component = (state = app.component, action) => {
  switch (action.type) {

    default:
      return state;
  }
};

//其他模块的reducers
import components from './components/reducers';
import Daily from './Daily/reducers';

const rootReducer = combineReducers({
  routing: routerReducer,
  component,
  components,
  Daily

});

export default rootReducer;
