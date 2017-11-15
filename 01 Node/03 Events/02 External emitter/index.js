const Retriever = require('./retriever');

const retrieverHandler = new Retriever(10);
retrieverHandler.on('start', () => console.log('Started'));
retrieverHandler.on('data', (data) => console.log(`Data: ${data}`));
retrieverHandler.on('end', (data) => console.log(`End data: ${data}`));
