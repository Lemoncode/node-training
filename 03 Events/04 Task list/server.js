const EventEmitter = require('events');

class Server extends EventEmitter {
  constructor(client) {
    super();

    client.on('command', (command) => {
      console.log(`Command: ${command}`);
    });
  }
}

module.exports = (client) => new Server(client);
