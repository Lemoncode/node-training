const { Duplex } = require('stream');

const inOutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },

  read(size) {
    setTimeout(() => {
      if (this.currentCharCode > 90) {
        this.push(null);
        return;
      }
      this.push(String.fromCharCode(this.currentCharCode++));
    }, 100);
  }
});

inOutStream.currentCharCode = 65;

process.stdin
  .pipe(inOutStream)
  .pipe(process.stdout);
