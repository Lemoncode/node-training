const EventEmitter = require('events').EventEmitter;

const deferredProcess = (triesCount, emitter) => {
  process.nextTick(() => {
    let count = 0;
    emitter.emit('start');
    const interval = setInterval(() => {
      emitter.emit('data', ++count);
      if (count === triesCount) {
        emitter.emit('end', count);
        clearInterval(interval);
      }
    }, 300);
  });
};

module.exports = class Retriever extends EventEmitter {
  constructor(triesCount) {
    super();
    deferredProcess(triesCount, this);
  }
};
