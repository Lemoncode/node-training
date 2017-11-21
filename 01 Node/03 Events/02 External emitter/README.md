# 02 External emitter

In this sample we are going to use previous sample, require it from other file and create different instances of `EventEmitter`.


Summary steps:

- Rename file to `retriever.js`.
- Create `index.js` calling to `retriever`.
- Create `EventEmitter` instance using `util.inherits`.
- Create `EventEmitter` instance using `ES6 classes`.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _01 Events_ as starting point.

# Steps

- Rename file to `retriever.js`.

- Export `retriever` method:

### ./retriever.js

```diff
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

- const dataRetriever = (countries) => {
+ const retriever = (countries) => {
  const emitter = new EventEmitter();
  deferredProcess(countries, emitter);

  return emitter;
};

+ module.exports = retriever;

- const dataRetrieverHandler = dataRetriever(10);
- dataRetrieverHandler.on('start', () => console.log('Started'));
- dataRetrieverHandler.on('data', (data) => console.log(`Data: ${data}`));
- dataRetrieverHandler.on('end', (data) => console.log(`End data: ${data}`));

```

- Create `index.js` calling to `retriever`:

### ./index.js

```javascript
const retriever = require('./retriever');

const retrieverHandler = retriever(10);
retrieverHandler.on('start', () => console.log('Started'));
retrieverHandler.on('data', (data) => console.log(`Data: ${data}`));
retrieverHandler.on('end', (data) => console.log(`End data: ${data}`));

```

- Run app:

```bash
node index
```

![extract retriever](../../99%20Resources/03%20Events/02%20External%20emitter/extract%20retriever.gif)

- Other way to create `EventEmitter` instance is extending this class. Previous to `ES6 classes`, Node provides an [`util`](https://nodejs.org/docs/latest-v6.x/api/util.html) module. We are going to use `util.inherits` to extend `EventEmitter`:

### ./retriever.js

```diff
- const EventEmitter = require('events').EventEmitter;
+ const util = require('util');

- const deferredProcess = (countries, emitter) => {
+ const deferredProcess = (count, countries, emitter) => {
-   process.nextTick(() => {
-     let count = 0;
      emitter.emit('start');
      const interval = setInterval(() => {
        emitter.emit('data', ++count);
        if (count === countries) {
          emitter.emit('end', count);
          clearInterval(interval);
        }
      }, 300);
-   });
};

- const retriever = (countries) => {
+ const Retriever = function(countries) {
-   const emitter = new EventEmitter();
-   deferredProcess(countries, emitter);

-   return emitter;
+   const self = this;
+   process.nextTick(() => deferredProcess(0, countries, self));
};

+ util.inherits(
+   Retriever,
+   require('events').EventEmitter
+ );

- module.exports = retriever;
+ module.exports = Retriever;

```

- Update `index` file:

### ./index.js

```diff
- const retriever = require('./retriever');
+ const Retriever = require('./retriever');

- const retrieverHandler = retriever(10);
+ const retrieverHandler = new Retriever(10);
retrieverHandler.on('start', () => console.log('Started'));
retrieverHandler.on('data', (data) => console.log(`Data: ${data}`));
retrieverHandler.on('end', (data) => console.log(`End data: ${data}`));

```

- If we could use `ES6`, we could create `EventEmitter` instance using `ES6 classes`:

### ./retriever.js

```diff
- const util = require('util');
+ const EventEmitter = require('events').EventEmitter;

const deferredProcess = (count, countries, emitter) => {
  emitter.emit('start');
  const interval = setInterval(() => {
    emitter.emit('data', ++count);
    if (count === countries) {
      emitter.emit('end', count);
      clearInterval(interval);
    }
  }, 300);
};

- const Retriever = function(countries) {
-   const self = this;
-   process.nextTick(() => deferredProcess(0, countries, self));
- };

- util.inherits(
-   Retriever,
-   require('events').EventEmitter
- );

- module.exports = Retriever;
+ module.exports = class Retriever extends EventEmitter {
+   constructor(countries) {
+     super();
+     process.nextTick(() => deferredProcess(0, countries, this));
+   }
+ };

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
