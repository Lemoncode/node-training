# 00 Handling Async Code

In this sample we are going to working with async code using `callbacks`, `Promises` and `async/await`.

Summary steps:

- Implement an async function to `readFileAsArray` using `callbacks`.
- Implement an async function to `readFileAsArray` using `Promises`.
- Get support for two flavours.
- Implement using `async/await`.

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
+       return cb(err);
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
      return cb(err);
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
-       return cb(err);
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

- This is great because we got a cleaner code, but the official way to go on Node it's the callback style. Whats if we get the two flavours?:

### ./index.js

```diff
const fs = require('fs');

- const readFileAsArray = (file) => {
+ const readFileAsArray = (file, cb = () => { }) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
+       return cb(error);
      };

      const lines = data.toString().trim().split('\n');
      resolve(lines);
+     cb(null, lines);
    });
  });
};

readFileAsArray('./numbers')
  .then((lines) => {
    const numbers = lines.map(Number);
    const oddNumber = numbers.filter(number => number % 2 === 1);
    console.log(`odd numbers count: ${oddNumber.length}`);
  })
  .catch(console.error);

```

- And for using with `callbacks` we could restore previous version:

### ./index.js

```diff
const fs = require('fs');

const readFileAsArray = (file, cb = () => { }) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
        return cb(error);
      };

      const lines = data.toString().trim().split('\n');
      resolve(lines);
      cb(null, lines);
    });
  });
};

- readFileAsArray('./numbers')
-   .then((lines) => {
+ readFileAsArray('./numbers', (err, lines) => {
+   if (err) {
+     throw err
+   };
    const numbers = lines.map(Number);
    const oddNumber = numbers.filter(number => number % 2 === 1);
    console.log(`odd numbers count: ${oddNumber.length}`);
- })
- .catch(console.error);
+ });

```

- Next step is implement it using `async/await`. But it's only available for `7.x` or higher `Node.js` version. So first, we need to change `node version` using `nvm`:

```bash
nvm use 8.9.0
```

- To ensure we have `async/await`:

```bash
node --v8-options | grep async
```

- Now we could rename `index.js` to `countOdd.js`:

### ./countOdd.js

```javascript
const fs = require('fs');

const readFileAsArray = (file, cb = () => { }) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
        return cb(error);
      };

      const lines = data.toString().trim().split('\n');
      resolve(lines);
      cb(null, lines);
    });
  });
};

readFileAsArray('./numbers', (err, lines) => {
  if (err) {
    throw err
  };
  const numbers = lines.map(Number);
  const oddNumber = numbers.filter(number => number % 2 === 1);
  console.log(`odd numbers count: ${oddNumber.length}`);
});

```

- Export a function named `countOddCallback` and `countOddPromises`:

### ./countOdd.js

```diff
const fs = require('fs');

const readFileAsArray = (file, cb = () => { }) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
        return cb(error);
      };

      const lines = data.toString().trim().split('\n');
      resolve(lines);
      cb(null, lines);
    });
  });
};

+ const countOddCallback = (file) => {
- readFileAsArray('./numbers', (err, lines) => {
+ readFileAsArray(file, (err, lines) => {
    if (err) {
      throw err
    };
    const numbers = lines.map(Number);
    const oddNumber = numbers.filter(number => number % 2 === 1);
    console.log(`odd numbers count: ${oddNumber.length}`);
  });
+ };

+ const countOddPromises = (file) => {
+   readFileAsArray(file)
+     .then((lines) => {
+       const numbers = lines.map(Number);
+       const oddNumber = numbers.filter(number => number % 2 === 1);
+       console.log(`odd numbers count: ${oddNumber.length}`);
+     })
+     .catch(console.error);
+ };

+ module.exports = {
+   countOddCallback,
+   countOddPromises,
+ }

```

- Create `index.js` file to use it:

### ./index.js

```javascript
const {
  countOddCallback,
  countOddPromises,
} = require('./countOdd');

countOddCallback('./numbers');
countOddPromises('./numbers');


```

- Run app:

```bash
node index
```

![run app callbacks and promises](../../99%20Resources/03%20Events/00%20Handling%20Async%20Code/run%20app%20callbacks%20and%20promises.png)

- And now, export `countOddAsync` using `async/await`:

### ./countOdd.js

```diff
const fs = require('fs');

const readFileAsArray = (file, cb = () => { }) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
        return cb(error);
      };

      const lines = data.toString().trim().split('\n');
      resolve(lines);
      cb(null, lines);
    });
  });
};

const countOddCallback = (file) => {
  readFileAsArray(file, (err, lines) => {
    if (err) {
      throw err
    };
    const numbers = lines.map(Number);
    const oddNumber = numbers.filter(number => number % 2 === 1);
    console.log(`odd numbers count: ${oddNumber.length}`);
  });
};

const countOddPromises = (file) => {
  readFileAsArray(file)
    .then((lines) => {
      const numbers = lines.map(Number);
      const oddNumber = numbers.filter(number => number % 2 === 1);
      console.log(`odd numbers count: ${oddNumber.length}`);
    })
    .catch(console.error);
};

+ const countOddAsync = async (file) => {
+   try {
+     const lines = await readFileAsArray(file);
+     const numbers = lines.map(Number);
+     const oddNumber = numbers.filter(number => number % 2 === 1);
+     console.log(`odd numbers count: ${oddNumber.length}`);
+   } catch (error) {
+     console.log(error);
+   }
+ }

module.exports = {
  countOddCallback,
  countOddPromises,
+ countOddAsync
}

```

### ./index.js

```diff
const {
  countOddCallback,
  countOddPromises,
+ countOddAsync,
} = require('./countOdd');

countOddCallback('./numbers');
countOddPromises('./numbers');
+ countOddAsync('./numbers');

```

- Run app:

```bash
node index
```

![run app callbacks promises and async](../../99%20Resources/03%20Events/00%20Handling%20Async%20Code/run%20app%20callbacks%20promises%20and%20async.png)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
