/* eslint-disable no-console */
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import fs from 'fs';
import colors from 'colors';
import columnify from 'columnify';
import glob from 'glob';
import sizeOf from 'image-size';

const IMAGE_INPUT = 'source/assets/image/*.{jpg,jpeg,png}';
const data = [];
function getFileName (fPath) {
  return fPath.slice(fPath.lastIndexOf('/') + 1);
}
// options is optional
glob(IMAGE_INPUT, function (er, files) {
  for ( let file of files ) {
    const dimensions = sizeOf(file);
    const stats = fs.statSync(file);
    const fileSizeInMegabytes = stats.size / 1000.0;
    data.push({
      name: file,
      width: dimensions.width,
      height: dimensions.height,
      size: fileSizeInMegabytes,
    });
  }
});

imagemin([IMAGE_INPUT], 'build/assets/images', {
  plugins: [
    imageminJpegtran({}),
    imageminPngquant({quality: '80-95'})
  ]
}).then(files => {
  for ( let file of files ) {
    const fileSizeInMegabytes = file.data.byteLength / 1000.0;
    const fPath = file.path;
    const result = data.find(it => getFileName(fPath) == getFileName(it.name));
    if ( result ) {
      result.buildSize = fileSizeInMegabytes;
      result.ratio = 100 - result.buildSize/result.size*100;
    }
  }
  console.log(columnify(
    data
      .sort((a, b) => b.buildSize - a.buildSize)
      .map(it => {
        const isSetColor = it.size > 100;
        it.ratio = `${it.ratio.toFixed(2)}%`;
        it.buildSize = `${it.buildSize}k`;
        it.size = `${it.size}k`;
        if ( isSetColor ) {
          for ( let key in it ) {
            it[key] = String(it[key]).red;
          }
        }
        return it;
      }),
    {
      config: {
        width: {align: 'right'},
        height: {align: 'right'},
        buildSize: {align: 'right'},
        size: {align: 'right'},
        ratio: {align: 'right'},
      }
    }
  ));
  //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
});
