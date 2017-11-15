const EventEmitter = require('events');
const readline = require('readline');

const client = new EventEmitter();
const server = require('./server')(client);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const [command, ...args] = input.split(' ');
  client.emit('command', command, args);
});

server.on('response', (response) => {
  process.stdout.write('\x1Bc');
  process.stdout.write(response);
  process.stdout.write('\n\>');
});
