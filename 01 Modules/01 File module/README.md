# 01 File module

In this sample we are going to learn how to create a custom module and export it to be used in other file using `CommonJS modules`.

Summary steps:

- Remove previous sample code.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _00 Built in_ as starting point.

# Steps

- Remove previous sample code.
- Create `mathfun.js` file.
- Some `export` samples.
- Use `mathfun` in `index.js` file.

### ./index.js

```diff
- const os = require('os');

- console.log(`Host: ${os.hostname()}`);
- console.log(`15 min. load avarage ${os.loadavg()}`);

- const toMb = (memory) => (
-   Math.round((memory / 1024 / 1024) * 100) / 100
- );

- console.log(`
-   ${toMb(os.freemem())} of ${toMb(os.totalmem())} Mb free
- `);

```

- Create `mathfun.js` file:

### ./mathfun.js

```javascript
const maxTime = 2000;

const intSqrt = (value, callback) => {
  const waitTime = Math.floor(Math.random() * (maxTime + 1));
  const result = Math.sqrt(value);
  (!Number.isInteger(result)) ?
    callback(new Error('Not integer square')) :
    callback(null, result, waitTime);
};

```

- How to export this method in Node.js? Using `CommonJS`. It's a simple module loading system implemented by Node. In Node.js, files and modules are in one-to-one correspondence (each file is treated as a separate module):

### ./mathfun.js

```diff
const maxTime = 2000;

const intSqrt = (value, callback) => {
  const waitTime = Math.floor(Math.random() * (maxTime + 1));
  const result = Math.sqrt(value);
  (!Number.isInteger(result)) ?
    callback(new Error('Not integer square')) :
    callback(null, result, waitTime);
};

+ module.exports.intSqrt = intSqrt;

```

- We could `export` everything, as `primitive types`, `object`, `functions`, etc:

### ./mathfun.js

```diff
const maxTime = 2000;

const intSqrt = (value, callback) => {
  const waitTime = Math.floor(Math.random() * (maxTime + 1));
  const result = Math.sqrt(value);
  (!Number.isInteger(result)) ?
    callback(new Error('Not integer square')) :
    callback(null, result, waitTime);
};

module.exports.intSqrt = intSqrt;
+ module.exports.foo = 'bar';

```

- Even, we could export as:

### ./mathfun.js

```diff
const maxTime = 2000;

const intSqrt = (value, callback) => {
  const waitTime = Math.floor(Math.random() * (maxTime + 1));
  const result = Math.sqrt(value);
  (!Number.isInteger(result)) ?
    callback(new Error('Not integer square')) :
    callback(null, result, waitTime);
};

- module.exports.intSqrt = intSqrt;
- module.exports.foo = 'bar';
+ module.exports = {
+   intSqrt,
+   foo: 'bar',
+ }

```

- Now we could keep file as before and use it in `index.js` file:

### ./mathfun.js

```diff
const maxTime = 2000;

const intSqrt = (value, callback) => {
  const waitTime = Math.floor(Math.random() * (maxTime + 1));
  const result = Math.sqrt(value);
  (!Number.isInteger(result)) ?
    callback(new Error('Not integer square')) :
    callback(null, result, waitTime);
};

- module.exports = {
-   intSqrt,
-   foo: 'bar',
- }
+ module.exports.intSqrt = intSqrt;

```

- Import `mathfun` file:

### ./index.js

```diff
+ const mathfun = require('./mathfun');

```

- And use it:

### ./index.js

```diff
const mathfun = require('./mathfun');

+ const processResult = (err, result, time) => {
+   if (err) {
+     console.log(`ERROR: ${err.message}`);
+   } else {
+     console.log(`The result is: ${result} (${time} ms)`);
+   }
+ };

+ [5, 25, 4, 8, 64].forEach(
+   (value) => mathfun.intSqrt(value, processResult)
+ );

```

- Press `F5` key to run app:

![run app](../../99%20Resources/01%20Modules/01%20File%20module/run%20app.png)

- We could use VS Code to debugg our app:

![debugging](../../99%20Resources/01%20Modules/01%20File%20module/debugging.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
