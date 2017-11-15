const EventEmitter = require('events');

const commands = {
  help: 'help',
  add: 'add',
  ls: 'ls',
  delete: 'delete',
};

class Server extends EventEmitter {
  constructor(client) {
    super();

    process.nextTick(() => {
      this.emit('response', 'Type a command');
    });

    client.on('command', (command, args) => {
      this.isCommandDefined(command) ?
        this[command](args) :
        this.emit('response', 'Unknown');
    });
  }

  isCommandDefined(command) {
    return Boolean(commands[command]);
  };

  help() {
    this.emit('response', 'help...');
  }

  add(args) {
    this.emit('response', args.join(' '));
  }

  ls() {
    this.emit('response', 'ls...');
  }

  delete() {
    this.emit('response', 'delete...');
  }
}

module.exports = (client) => new Server(client);
