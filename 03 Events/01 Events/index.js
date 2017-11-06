const EventEmitter = require('events').EventEmitter;

const deferredProcess = (countries, emitter) => {
  process.nextTick(() => {
    let count = 0;
    emitter.emit('start');
    const interval = setInterval(() => {
      emitter.emit('data', ++count);
      if (count === countries) {
        emitter.emit('end', count);
        clearInterval(interval);
      }
    }, 300);
  });
};

const dataRetriever = (countries) => {
  const emitter = new EventEmitter();
  deferredProcess(countries, emitter);

  return emitter;
};

const dataRetrieverHandler = dataRetriever(10);
dataRetrieverHandler.on('start', () => console.log('Started'));
dataRetrieverHandler.on('data', (data) => console.log(`Data: ${data}`));
dataRetrieverHandler.on('end', (data) => console.log(`End data: ${data}`));
