const _ = require('lodash');

module.exports = function(source) {
  this.cacheable && this.cacheable();

  const template = _.template(source, {
    interpolate: /<%=([\s\S]+?)%>/g // see more like escape、evaluate
  });
  return 'module.exports = ' + template;
};
