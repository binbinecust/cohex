import _ from 'lodash';

/**
 * 所有与类型转化相关的通用方法写这里
 * @type {[type]}
 */

/**
 * 数组转化为字符串
 * @param  {[type]} _object [对象]
 * @param  {[type]} _split  [分隔符，默认为逗号]
 * @param  {[type]} _encode [是否编码]
 * @return {String}         key-value串
 */
export const object2string = (_object, _split, _encode) => {
  if (!_object)
    return '';
  let _arr = [];

  _.forIn(_object, (_value, _key) => {
    if (_.isFunction(_value))
      return;
    if (_.isDate(_value))
      _value = _value.getTime();
    else if (_.isArray(_value))
      _value = _value.join(',');
    else if (_.isObject(_value))
      _value = _value.stringify(_value);

    if (_encode) {
      _value = encodeURIComponent(_value);
    }

    _arr.push(encodeURIComponent(_key) + '=' + _value);
  });

  return _arr.join(_split || ',');
};
/**
 * [object2query description]
 * @param  {[type]} _object [对象]
 * @return {[type]}         [查询串]
 */
export const object2query = (_object) => {
  return object2string(_object, '&', !0);
};
