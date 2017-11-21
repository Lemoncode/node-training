const fs = require('fs');
const zlib = require('zlib');
const { Transform } = require('stream');

const fileName = process.argv[2];

const progress = new Transform({
  transform(chunck, encoding, callback) {
    process.stdout.write('.');
    callback(null, chunck);
  }
});

fs.createReadStream(fileName)
  .pipe(zlib.createGzip())
  .pipe(progress)
  .pipe(fs.createWriteStream(`${fileName}.gz`))
  .on('finish', () => console.log('Done'));
