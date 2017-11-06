const util = require('util');

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

const Retriever = function(countries) {
  const self = this;
  let count = 0;
  process.nextTick(() => deferredProcess(count, countries, self));
};

util.inherits(
  Retriever,
  require('events').EventEmitter
);

module.exports = Retriever;
