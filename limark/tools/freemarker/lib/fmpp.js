let child = require('child_process');
let exec = child.exec;
let execSync = child.execSync;

let path = require('path');
let fs = require('fs');

let fmppName = process.platform === 'win32' ? 'fmpp.bat' : 'fmpp';
let fmpp = path.join(__dirname, '../fmpp', fmppName);

function run(args, done) {

  let command = fmpp + ' ' + args.join(' ');

  exec(command,
    function(error, stdout, stderr) {

      done(error || stderr, stdout);

    });
}

function runSync(args) {
  let command = fmpp + ' ' + args.join(' ');

  if(execSync) {
    // On node.js v0.12, there comes execSync() method which exactly we want
    return execSync(command);
  } else {
    // Here is inefficiency and ugliness hack for older version of node.js
    exec(command + ' 2>&1 1>output && echo done! > done');
    while(!fs.existsSync('done')) {}

    let output = fs.readFileSync('output');
    fs.unlinkSync('output');
    fs.unlinkSync('done');

    return '' + output;
  }
}

exports.run = run;
exports.runSync = runSync;
