# 04 Task list

In this sample we are going to create a `client` and `server` to send commands.

Summary steps:

- Create `client.js` file.
- Create `server.js` file.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _03 Sync to async class_ as starting point.

# Steps

- Delete `async.js` and `index.js` files.

- First, we could start with `client` side. We are going to use [`readline.createInterface`](https://nodejs.org/docs/latest-v6.x/api/readline.html) to create an I/O interface:

### ./client.js

```javascript
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

```

- We could create an `client` with `EventEmitter` to send events to `server`:

### ./client.js

```diff
+ const EventEmitter = require('events');
const readline = require('readline');

+ const client = new EventEmitter();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

```

- Finally, we could implement the `readline`'s `line` handler to read commands from console:

### ./client.js

```diff
const EventEmitter = require('events');
const readline = require('readline');

const client = new EventEmitter();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

+ rl.on('line', (input) => {
+   console.log(input);
+ });

```

![readline](../../99%20Resources/03%20Events/04%20Task%20list/readline.gif)

- We could emit a command each time introduce a line:

### ./client.js

```diff
const EventEmitter = require('events');
const readline = require('readline');

const client = new EventEmitter();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
- console.log(input);
+ client.emit('command', input);
});

```

- Now, it's time to start with `server` side:

### ./server.js

```javascript
const EventEmitter = require('events');

class Server extends EventEmitter {

}

module.exports = new Server();

```

- To get access to `client events` we need to pass the client `EventEmitter` instance throught `server constructor`:

### ./server.js

```diff
const EventEmitter = require('events');

class Server extends EventEmitter {
+ constructor(client) {
+   super();
+ }
}

- module.exports = new Server();
+ module.exports = (client) => new Server(client);

```

- And we need to implement the `command` handler:

### ./server.js

```diff
const EventEmitter = require('events');

class Server extends EventEmitter {
  constructor(client) {
    super();

+   client.on('command', (command) => {
+     console.log(`Command: ${command}`);
+   });
  }
}

module.exports = (client) => new Server(client);

```

- Importing `server` in `client` side:

### ./client.js

```diff
const EventEmitter = require('events');
const readline = require('readline');

const client = new EventEmitter();
+ const server = require('./server')(client);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  client.emit('command', input);
});

```

![connect with server](../../99%20Resources/03%20Events/04%20Task%20list/connect%20with%20server.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
