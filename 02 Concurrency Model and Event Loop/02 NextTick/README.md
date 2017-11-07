# 02 NextTick

In this sample we are going to learn how to use `nextTick` method.

Summary steps:

- Create an async function to show `fileSize`.
- Demostrate that previous function has a `sync` and `async` behavior.
- Fix this with `nextTick` method.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _01 SetImmediate_ as starting point.

# Steps

- Remove previous `index.js` sample code.

### ./index.js

```diff
- const fs = require('fs');

- fs.readFile(__filename, () => {
-   setTimeout(() => {
-     console.log('timeout');
-   }, 0);
-   setImmediate(() => {
-     console.log('immediate');
-   });
- });

```

- First, we are goint to create an async function to show `fileSize`.

### ./index.js

```diff
+ const fs = require('fs');

+ function fileSize(fileName, cb) {
+   if (typeof fileName !== 'string') {
+     return cb(new TypeError('args should be string'));
+   }

+   fs.stat(fileName, (err, stats) => {
+     if (err) {
+       return cb(err);
+     }

+     cb(null, stats.size);
+   });
+ }

```

- Use `fileSize` function and add other `console.log` to check asynchrony:

### ./index.js

```diff
const fs = require('fs');

function fileSize(fileName, cb) {
  if (typeof fileName !== 'string') {
    return cb(new TypeError('args should be string'));
  }

  fs.stat(fileName, (err, stats) => {
    if (err) {
      return cb(err);
    }

    cb(null, stats.size);
  });
}

+ fileSize(__filename, (err, size) => {
+   if (err) {
+     throw err;
+   }

+   console.log(`Size in KB: ${size / 1024}`);
+ });

+ console.log('Hello!');

```

- Press `F5` key to run app:

![first run](../../99%20Resources/02%20Concurrency%20Model%20and%20Event%20Loop/02%20NextTick/first%20run.png)

- It's async because we watch `Hello!` before the `fileSize` result, but this code has a problem, what happends if we change `__filename` by a number?:

### ./index.js

```diff
const fs = require('fs');

function fileSize(fileName, cb) {
  if (typeof fileName !== 'string') {
    return cb(new TypeError('args should be string'));
  }

  fs.stat(fileName, (err, stats) => {
    if (err) {
      return cb(err);
    }

    cb(null, stats.size);
  });
}

- fileSize(__filename, (err, size) => {
+ fileSize(1, (err, size) => {
  if (err) {
    throw err;
  }

  console.log(`Size in KB: ${size / 1024}`);
});

console.log('Hello!');

```

- Press `F5` key to run app:

![throw exception](../../99%20Resources/02%20Concurrency%20Model%20and%20Event%20Loop/02%20NextTick/throw%20exception.png)

- The validation code was executed but `console.log('Hello!');` isn't because the validation is sync. This is usually a bad design because a function should always be either sync or async.

- We could use [`process.nextTick`](https://nodejs.org/docs/latest-v6.x/api/process.html#process_process_nexttick_callback_args):

### ./index.js

```diff
const fs = require('fs');

function fileSize(fileName, cb) {
  if (typeof fileName !== 'string') {
-   return cb(new TypeError('args should be string'));
+   return process.nextTick(cb, new TypeError('args should be string'));
  }

  fs.stat(fileName, (err, stats) => {
    if (err) {
      return cb(err);
    }

    cb(null, stats.size);
  });
}

fileSize(1, (err, size) => {
  if (err) {
    throw err;
  }

  console.log(`Size in KB: ${size / 1024}`);
});

console.log('Hello!');

```

- Press `F5` key to run app:

![throw exception nextTick](../../99%20Resources/02%20Concurrency%20Model%20and%20Event%20Loop/02%20NextTick/throw%20exception%20nextTick.png)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
