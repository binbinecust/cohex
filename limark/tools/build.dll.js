// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
import webpack from 'webpack';
import config from '../webpack.config.dev.dll';
import { chalkError, chalkSuccess, chalkWarning, chalkProcessing } from './chalkConfig';
import ora from 'ora';
import path from 'path';
import rimraf from 'rimraf';
// this assures React is built in dev mode and that the Babel dev config doesn't apply.
process.env.NODE_ENV = 'development'; 

console.log(chalkProcessing('Generating minified bundle for  dll vendors via Webpack. This will take a moment...'));

const spinner = ora('building for dll vendors...');
spinner.start();

rimraf.sync(path.resolve(__dirname, '../source/.cache'));
webpack(config).run((error, stats) => {
  if (error) { // so a fatal error occurred. Stop here.
    console.log(chalkError(error));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (stats.hasErrors()) {
    jsonStats.errors.map(error => console.log(chalkError(error)));
    process.exit(1);
  }

  if (stats.hasWarnings()) {
    console.log(chalkWarning('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
  }

  spinner.stop();

  console.log(stats.toString({
    colors: true,
    hash: true,
    version: true,
    children: false,
    chunks: false,
    modules: false,
    chunkModules: false
  }));

  // if we got this far, the build succeeded.
  console.log(chalkSuccess('Your dll vendors is compiled in development mode in /source/.cache. It\'s ready to roll!'));

  return 0;
});
