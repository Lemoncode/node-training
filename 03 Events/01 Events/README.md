# 01 Events

In this sample we are going to create a basic sample to work with Node.js `Events`.

Summary steps:

-

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _00 Handling Async Code_ as starting point.

# Steps

- Delete `countOdd.js` and `numbers` files and remove previous `index.js` sample code.

### ./index.js

```diff
- const {
-   countOddCallback,
-   countOddPromises,
-   countOddAsync,
- } = require('./countOdd');

- countOddCallback('./numbers');
- countOddPromises('./numbers');
- countOddAsync('./numbers');

```

- For this sample is not necessary to work with Node.js `v8.x` so we could:

```bash
nvm use 6.11.5
```

- In Node.js, _all objects that emit [`events`](https://nodejs.org/docs/latest-v6.x/api/events.html) are instances of the `EventEmitter` class. These objects expose an `eventEmitter.on(`) function that allows one or more functions to be attached to named events emitted by the object._

- So, we have to require the `EventEmitter` from `events` to create an instance of:

### ./index.js

```diff
+ const EventEmitter = require('events').EventEmitter;

```

- Create an instace of `EventEmitter`:

### ./index.js

```diff
const EventEmitter = require('events').EventEmitter;

+ const dataRetriever = (countTries) => {
+   const emitter = new EventEmitter();
+   deferredProcess(countTries, emitter);

+   return emitter;
+ };

```

- Now, we are going to simulate an async process to retrieve data from some server. We could use `process.nextTick` and `setInterval` to simulate that behaviour:

### ./index.js

```diff
const EventEmitter = require('events').EventEmitter;

+ const deferredProcess = (countTries, emitter) => {
+   process.nextTick(() => {
+     let count = 0;
+     emitter.emit('start');
+     const interval = setInterval(() => {
+       emitter.emit('data', ++count);
+       if (count === countTries) {
+         emitter.emit('end', count);
+         clearInterval(interval);
+       }
+     }, 300);
+   });
+ };

const dataRetriever = (countTries) => {
  const emitter = new EventEmitter();
  deferredProcess(countTries, emitter);

  return emitter;
};

```

- For example, we are going to retrieve `10 countries`:

### ./index.js

```diff
const EventEmitter = require('events').EventEmitter;

const deferredProcess = (countTries, emitter) => {
  process.nextTick(() => {
    let count = 0;
    emitter.emit('start');
    const interval = setInterval(() => {
      emitter.emit('data', ++count);
      if (count === countTries) {
        emitter.emit('end', count);
        clearInterval(interval);
      }
    }, 300);
  });
};

const dataRetriever = (countTries) => {
  const emitter = new EventEmitter();
  deferredProcess(countTries, emitter);

  return emitter;
};

+ const dataRetrieverHandler = dataRetriever(10);

```

- On `start` we could log a `Started` message:

### ./index.js

```diff
...

const dataRetrieverHandler = dataRetriever(10);
+ dataRetrieverHandler.on('start', () => console.log('Started'));

```

- While retrieving countries, we log:

### ./index.js

```diff
...

const dataRetrieverHandler = dataRetriever(10);
dataRetrieverHandler.on('start', () => console.log('Started'));
+ dataRetrieverHandler.on('data', (data) => console.log(`Data: ${data}`));

```

- Finally:

### ./index.js

```diff
...

const dataRetrieverHandler = dataRetriever(10);
dataRetrieverHandler.on('start', () => console.log('Started'));
dataRetrieverHandler.on('data', (data) => console.log(`Data: ${data}`));
+ dataRetrieverHandler.on('end', (data) => console.log(`End data: ${data}`));

```

- Run app:

```bash
node index
```

![run app](../../99%20Resources/03%20Events/01%20Events/run%20app.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
