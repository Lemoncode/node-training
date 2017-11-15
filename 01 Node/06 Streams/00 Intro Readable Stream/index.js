const request = require('request');

const readableStream = request('http://www.leanmood.com/');

const dataHandler = (counter) => (chunk) => {
  console.log(`Data: ${chunk}`);
  setTimeout(() => console.log(`Chunk processed ${++counter}`), 3000);
};

const endHandler = () => console.log('Finished.');

readableStream.on('data', dataHandler(0));
readableStream.on('end', endHandler);
