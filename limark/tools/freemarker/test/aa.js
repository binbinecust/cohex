let Freemarker = require('../index.js');
let path = require('path');
let fs = require('fs');

let fm = new Freemarker({
  viewRoot: path.join(__dirname, './template/'),

  options: {
    sourceEncoding: 'utf-8'
  }
});

let data = fm.renderSync('test.ftl', {word : {user : {sb: "坏人"}}});
console.log(data);