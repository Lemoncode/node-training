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

const dataRetriever = (triesCount) => {
  const emitter = new EventEmitter();
  deferredProcess(triesCount, emitter);

  return emitter;
};

const dataRetrieverHandler = dataRetriever(10);
dataRetrieverHandler.on('start', () => console.log('Started'));
dataRetrieverHandler.on('data', (data) => console.log(`Data: ${data}`));
dataRetrieverHandler.on('end', (data) => console.log(`End data: ${data}`));
