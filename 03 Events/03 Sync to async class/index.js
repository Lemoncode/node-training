const EventEmitter = require('events');

class WithLog extends EventEmitter {
  execute(asyncFunc) {
    asyncFunc();
    console.log('Before');
    this.emit('begin');
    this.emit('end');
    console.log('after');
  }
}

const withLog = new WithLog();

withLog.on('begin', () => console.log('begin'));
withLog.on('end', () => console.log('end'));

withLog.execute(() => {
  setTimeout(() => console.log('executing'),
    500);
});
