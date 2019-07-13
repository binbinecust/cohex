

/**
 * 对数组按照首字母分类
 * @param  {Array} array         要进行分类的数组
 * @param  {Function} selector   如果数组元素为对象，则需告知取哪个值进行分类。如：(obj) => obj.pinyin
 * @return {Array}
 */
export const pySegSort = (arr, selector) => {
  const select = (val) => {
    if (selector) return selector(val);
    return val;
  };

  const lettersArr = "abcdefghijklmnopqrstuvwxyz".split('');
  const lettersMap = {};
  lettersArr.forEach(letter => lettersMap[letter] = true);

  const sortedArr = arr.sort((a,b) => {
    return select(a).localeCompare(select(b));
  });

  const groups = [];
  const notLetter = sortedArr.filter((val) => !lettersMap[select(val)[0].toLowerCase()]);
  if (notLetter.length > 0) {
    groups.push({
      group: '#',
      values: notLetter
    });
  }
  lettersArr.forEach((l) => {
    const result = {
      group: l,
      values: []
    };
    sortedArr.forEach((val) => {
      if (l === select(val)[0].toLowerCase()) {
        result.values.push(val);
      }
    });
    if (result.values.length > 0) groups.push(result);
  });

  return groups;
};