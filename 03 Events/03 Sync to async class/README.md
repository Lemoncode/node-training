# 03 Sync to async class

In this sample we are going to learn how to migrate sync function using `events` to `async` code.

Summary steps:

- Create sync `EventEmitter`.
- Executing `async` code with `setTimeout`.
- Executing `async` code with `fs.readFile`.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _02 External emitter_ as starting point.

# Steps

- Delete `retriever.js` file and remove previous `index.js` sample code.

### ./index.js

```diff
- const Retriever = require('./retriever');

- const retrieverHandler = new Retriever(10);
- retrieverHandler.on('start', () => console.log('Started'));
- retrieverHandler.on('data', (data) => console.log(`Data: ${data}`));
- retrieverHandler.on('end', (data) => console.log(`End data: ${data}`));

```

- First, we are going to create a sync `EventEmitter`:

### ./index.js

```diff
+ const EventEmitter = require('events');

+ class WithLog extends EventEmitter {
+   execute(taskFunc) {
+     console.log('Before');
+     this.emit('begin');
+     taskFunc();
+     this.emit('end');
+     console.log('after');
+   }
+ }

```

- It's important to notice here that everything that happens it sync, there is nothing async:

### ./index.js

```diff
const EventEmitter = require('events');

class WithLog extends EventEmitter {
  execute(taskFunc) {
    console.log('Before');
    this.emit('begin');
    taskFunc();
    this.emit('end');
    console.log('after');
  }
}

+ const withLog = new WithLog();

+ withLog.on('begin', () => console.log('begin'));
+ withLog.on('end', () => console.log('end'));

+ withLog.execute(() => console.log('executing'));

```

- Run app:

```bash
node index
```

![sync code](../../99%20Resources/03%20Events/03%20Sync%20to%20async%20class/sync%20code.png)

- We could simulate `async` code with `setTimeout`:

### ./index.js

```diff
const EventEmitter = require('events');

class WithLog extends EventEmitter {
  execute(taskFunc) {
    console.log('Before');
    this.emit('begin');
    taskFunc();
    this.emit('end');
    console.log('after');
  }
}

const withLog = new WithLog();

withLog.on('begin', () => console.log('begin'));
withLog.on('end', () => console.log('end'));

- withLog.execute(() => console.log('executing'));
+ withLog.execute(() => {
+   setTimeout(() => console.log('executing'),
+     500);
+ });

```

- Even, if we execute first the async function:

### ./index.js

```diff
const EventEmitter = require('events');

class WithLog extends EventEmitter {
- execute(taskFunc) {
+ execute(asyncFunc) {
+   asyncFunc();
    console.log('Before');
    this.emit('begin');
-   taskFunc();
    this.emit('end');
    console.log('after');
  }
}

const withLog = new WithLog();

withLog.on('begin', () => console.log('begin'));
withLog.on('end', () => console.log('end'));

withLog.execute(() => {
  setTimeout(() => console.log('executing'),
    500);
});

```

- Run app:

```bash
node index
```

![simulate async code](../../99%20Resources/03%20Events/03%20Sync%20to%20async%20class/simulate%20async%20code.png)

- To emit an event after async function finished, we'll probably need to combine callbacks or promises with this event-based communication. We are going to create a `WithTime EventEmitter`:

### ./async.js

```javascript
const fs = require('fs');
const EventEmitter = require('events');

```

- Add `WithTime` class:

### ./async.js

```diff
const fs = require('fs');
const EventEmitter = require('events');

+ class WithTime extends EventEmitter {
+   execute(asyncFunc, ...args) {
+     console.time('Executed in');
+     asyncFunc(...args, (err, data) => {
+       if (err) {
+         return this.emit('error', err);
+       }

+       this.emit('data', data);
+       console.timeEnd('Executed in');
+       this.emit('end');
+     });
+   }
+ }

```

- Add event handlers:

### ./async.js

```diff
const fs = require('fs');
const EventEmitter = require('events');

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    console.time('Executed in');
    asyncFunc(...args, (err, data) => {
      if (err) {
        return this.emit('error', err);
      }

      this.emit('data', data);
      console.timeEnd('Executed in');
      this.emit('end');
    });
  }
}

+ const withTime = new WithTime();

+ withTime.on('data', (data) => console.log(data));
+ withTime.on('error', (error) => console.error(error));
+ withTime.on('end', () => console.log('end'));

+ withTime.execute(fs.readFile, __filename);

```

- Run app:

```bash
node async
```

![async code](../../99%20Resources/03%20Events/03%20Sync%20to%20async%20class/async%20code.png)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
