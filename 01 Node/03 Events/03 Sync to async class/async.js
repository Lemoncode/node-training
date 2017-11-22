const fs = require('fs');
const EventEmitter = require('events');

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    console.time('Executed in');
    asyncFunc(...args, (err, data) => {
      if (err) {
        this.emit('error', err);
        return console.timeEnd('Executed in');
      }

      this.emit('data', data);
      console.timeEnd('Executed in');
      this.emit('end');
    });
  }
}

const withTime = new WithTime();

withTime.on('data', (data) => console.log(data));
withTime.on('error', (error) => console.error(error));
withTime.on('end', () => console.log('end'));

withTime.execute(fs.readFile, __filename);
