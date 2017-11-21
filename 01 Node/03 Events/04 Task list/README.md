# 04 Task list

In this sample we are going to create two `EventEmitter`s instances splitted in two files and one unique `node process`. That is, each `EventEmitter` has its own file. So, we'll have the `client` and `server` files.

We need a comunication between `client` and `server`. To simplify it, the `server` receives a `client` instance like:

### ./client.js

```javascript
const client = new EventEmitter();
const server = require('./server')(client);
```

### ./server.js

```javascript
class Server extends EventEmitter {
  constructor(client) {
  }
  ...
}
...
module.exports = (client) => new Server(client);
```

The aim of this sample is implement a `Task list` where the `server` are listening each `command` (event) `emitted` by client.
The commands are:
  - `add`: Add a task to the list.
  - `delete`: Remove a task from the list.
  - `ls`: Show all tasks in the list.
  - `help`: Give info about commands.

> NOTE: if `client` emits other commands different than previous one, it responses with `Unknown` message.

The workflow could be:

- The `client` emit `commands` that user writes in the terminal/console. `Server` is listening that `commands`.
- The `server` emit a `response` for each command. `Client` is listening that `response`.

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
});

rl.on('line', (input) => {
  client.emit('command', input);
});

```

![connect with server](../../99%20Resources/03%20Events/04%20Task%20list/connect%20with%20server.gif)

- Now that we know it's working, we could define some commands that will be responded by server:

### ./server.js

```diff
const EventEmitter = require('events');

class Server extends EventEmitter {
  constructor(client) {
    super();

    client.on('command', (command) => {
      console.log(`Command: ${command}`);
    });
  }

+ help() {
+   this.emit('response', 'help...');
+ }

+ add() {
+   this.emit('response', 'add...');
+ }

+ ls() {
+   this.emit('response', 'ls...');
+ }

+ delete() {
+   this.emit('response', 'delete...');
+ }
}

module.exports = (client) => new Server(client);

```

- For unknown commands, we will response `Unknown`:

### ./server.js

```diff
const EventEmitter = require('events');

+ const commands = {
+   help: 'help',
+   add: 'add',
+   ls: 'ls',
+   delete: 'delete',
+ };

class Server extends EventEmitter {
  constructor(client) {
    super();

    client.on('command', (command) => {
-     console.log(`Command: ${command}`);
+     this.isCommandDefined(command) ?
+       this[command]() :
+       this.emit('response', 'Unknown');
    });
  }

+ isCommandDefined(command) {
+   return Boolean(commands[command]);
+ };

  help() {
    this.emit('response', 'help...');
  }

  add() {
    this.emit('response', 'add...');
  }

  ls() {
    this.emit('response', 'ls...');
  }

  delete() {
    this.emit('response', 'delete...');
  }
}

module.exports = (client) => new Server(client);

```

- Finally, we need to implement the `response` handler in `client` side:

### ./client.js

```diff
const EventEmitter = require('events');
const readline = require('readline');

const client = new EventEmitter();
const server = require('./server')(client);

const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (input) => {
  client.emit('command', input);
});

+ server.on('response', (response) => {
+   console.log(response);
+ });

```

![send commands](../../99%20Resources/03%20Events/04%20Task%20list/send%20commands.gif)

- Now we could make it more user friendly like:

### ./client.js

```diff
...

server.on('response', (response) => {
- console.log(response);
+ process.stdout.write('\x1Bc');
+ process.stdout.write(response);
+ process.stdout.write('\n\>');
});

```

![friendly response](../../99%20Resources/03%20Events/04%20Task%20list/friendly%20response.gif)

- At the beginning we can do something from server to make that user understand that has to type a command:

### ./server.js

```diff
...

class Server extends EventEmitter {
  constructor(client) {
    super();

+   this.emit('response', 'Type a command');

    client.on('command', (command) => {
      this.isCommandDefined(command) ?
        this[command]() :
        this.emit('response', 'Unknown');
    });
  }
...

```

- But this is not going to work due to when this line is executed is when client side is instantiating the `server` class:

### ./client.js

```javascript
const server = require('./server')(client);

```

- To solve this, we could wrap i on `process.nextTick`:

### ./server.js

```diff
...

class Server extends EventEmitter {
  constructor(client) {
    super();

+   process.nextTick(() => {
      this.emit('response', 'Type a command');
+   });

    client.on('command', (command) => {
      this.isCommandDefined(command) ?
        this[command]() :
        this.emit('response', 'Unknown');
    });
  }
...

```

![initial text](../../99%20Resources/03%20Events/04%20Task%20list/initial%20text.gif)

- There are some commands that need associated payload, for example the `add` command:

### ./client.js

```diff
...

rl.on('line', (input) => {
- client.emit('command', input);
+ const [command, ...args] = input.split(' ');
+ client.emit('command', command, args);
});

...

```

### ./server.js

```diff
...

class Server extends EventEmitter {
  constructor(client) {
    super();

    process.nextTick(() => {
      this.emit('response', 'Type a command');
    });

-   client.on('command', (command) => {
+   client.on('command', (command, args) => {
      this.isCommandDefined(command) ?
-       this[command]() :
+       this[command](args) :
        this.emit('response', 'Unknown');
    });
  }
...

- add() {
+ add(args) {
-   this.emit('response', 'add...');
+   this.emit('response', args.join(' '));
  }
...

```

![passing args](../../99%20Resources/03%20Events/04%20Task%20list/passing%20args.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
