# 00 Handling Async Code

In this sample we are going to working with async code using `callbacks`, `Promises` and `async`.

Summary steps:

- Implement an async function to `readFileAsArray` using `callbacks`.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _02 NextTick_ as starting point.

# Steps

- Remove previous `index.js` sample code.

### ./index.js

```diff
- const fs = require('fs');

- function fileSize(fileName, cb) {
-   if (typeof fileName !== 'string') {
-     return process.nextTick(cb, new TypeError('args should be string'));
-   }

-   fs.stat(fileName, (err, stats) => {
-     if (err) {
-       return cb(err);
-     }

-     cb(null, stats.size);
-   });
- }

- fileSize(1, (err, size) => {
-   if (err) {
-     throw err;
-   }

-   console.log(`Size in KB: ${size / 1024}`);
- });

- console.log('Hello!');

```

- Implement an async function to `readFileAsArray` and see which are odd numbers, using `callbacks`.

### ./index.js

```diff
+ const fs = require('fs');

+ const readFileAsArray = (file, cb) => {
+   fs.readFile(file, (err, data) => {
+     if (err) {
+       return err
+     };

+     const lines = data.toString().trim().split('\n');
+     cb(null, lines);
+   });
+ };

```

- Add `numbers` file to read it:

### ./numbers

```
101
102
103

```

- Use this async function passing a `callback`:

### ./index.js

```diff
const fs = require('fs');

const readFileAsArray = (file, cb) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      return err
    };

    const lines = data.toString().trim().split('\n');
    cb(null, lines);
  });
};

+ readFileAsArray('./numbers', (err, lines) => {
+   if (err) {
+     throw err
+   };

+   const numbers = lines.map(Number);
+   const oddNumber = numbers.filter(number => number % 2 === 1);
+   console.log(`odd numbers count: ${oddNumber.length}`);
+ });

```

- Run app:

```bash
node index
```

![run app callbacks](../../99%20Resources/03%20Events/00%20Handling%20Async%20Code/run%20app%20callbacks.png)

- How it looks like if we use `Promises`?:

### ./index.js

```diff
const fs = require('fs');

- const readFileAsArray = (file, cb) => {
+ const readFileAsArray = (file) => {
+   return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
-       return err
+       reject(err);
      };

      const lines = data.toString().trim().split('\n');
-     cb(null, lines);
+     resolve(lines);
    });
+  });
};

- readFileAsArray('./numbers', (err, lines) => {
-   if (err) {
-     throw err
-   };
+ readFileAsArray('./numbers')
+   .then((lines) => {
      const numbers = lines.map(Number);
      const oddNumber = numbers.filter(number => number % 2 === 1);
      console.log(`odd numbers count: ${oddNumber.length}`);
- });
+   })
+   .catch(console.error);
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
