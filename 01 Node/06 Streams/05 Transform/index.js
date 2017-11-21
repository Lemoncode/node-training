const { Transform } = require('stream');

const upperCaseTransform = new Transform({
  transform(chunck, encoding, callback) {
    this.push(chunck.toString().toUpperCase());
    callback();
  }
});

process.stdin
  .pipe(upperCaseTransform)
  .pipe(process.stdout);
