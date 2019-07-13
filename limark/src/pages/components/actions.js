/**
 * components的actions
 * @type {String}
 */
import {request} from '../../utils/';

export const SET_DIDLIST = 'Components/SET_DIDLIST';

const setDidList = value => ({type: SET_DIDLIST, value});


// 获取did号码列表
export const getDidList = () => dispatch => {
  dispatch(setDidList({loading: true}));
  request({
    url: '/api/callcenter/did/list',
    method: 'GET',
  }).then(json => {
    dispatch(setDidList({loading: false, list: json.result, set: new Set(json.result)}));
  }).catch(err => {
    dispatch(setDidList({loading: false}));
  });
};

