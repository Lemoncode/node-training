const EventEmitter = require('events').EventEmitter;

const deferredProcess = (count, countries, emitter) => {
  emitter.emit('start');
  const interval = setInterval(() => {
    emitter.emit('data', ++count);
    if (count === countries) {
      emitter.emit('end', count);
      clearInterval(interval);
    }
  }, 300);
};

module.exports = class Retriever extends EventEmitter {
  constructor(countries) {
    super();
    process.nextTick(() => deferredProcess(0, countries, this));
  }
};
