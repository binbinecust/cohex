/* eslint-disable import/default */

import loaderUtils from 'loader-utils';

export default function (source) {
  const query = loaderUtils.parseQuery(this.query);
  const id = query.id || '';

  if (this.cacheable) {
    this.cacheable();
  }

  console.log('--- START', id);
  console.log(this.resource);
  console.log('--- END', id);

  return source;
}
