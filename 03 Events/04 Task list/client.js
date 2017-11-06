const EventEmitter = require('events');
const readline = require('readline');

const client = new EventEmitter();
const server = require('./server')(client);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  client.emit('command', input);
});
