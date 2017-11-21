# 02 NPM modules

In this sample we are going to learn how to create and configure a `package.json` file, install a npm third library and use it.

Summary steps:

- Remove previous sample code.
- Delete `mathfun.js` file.
- Create `package.json` file.
- Install `request` library.
- Import `request` lib.
- Make http call to `lemoncode.net`.
- Using `npm scripts`.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _01 File module_ as starting point.

# Steps

- Remove previous `index.js` sample code.

### ./index.js

```diff
- const mathfun = require('./mathfun');

- const processResult = (err, result, time) => {
-   if (err) {
-     console.log(`ERROR: ${err.message}`);
-   } else {
-     console.log(`The result is: ${result} (${time} ms)`);
-   }
- };

- [5, 25, 4, 8, 64].forEach(
-   (value) => mathfun.intSqrt(value, processResult)
- );

```

- Delete `mathfun.js` file.

- Create `package.json` file:

```bash
npm init
```

- And we get something like:

### ./package.json

```json
{
  "name": "npm-modules-sample",
  "version": "1.0.0",
  "description": "How to create and configure a package.json file, install a npm third library and use it",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Lemoncode/node-training.git"
  },
  "author": "Lemoncode",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/Lemoncode/node-training/issues"
  },
  "homepage": "https://github.com/Lemoncode/node-training#readme"
}

```

- To install [`request`](https://github.com/request/request) library we are going to use `npm`:

```bash
npm install request --save
```

- Now we see that `package.json` was updated:

### ./package.json

```diff
{
  "name": "npm-modules-sample",
  "version": "1.0.0",
  "description": "How to create and configure a package.json file, install a npm third library and use it",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Lemoncode/node-training.git"
  },
  "author": "Lemoncode",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/Lemoncode/node-training/issues"
  },
- "homepage": "https://github.com/Lemoncode/node-training#readme"
+ "homepage": "https://github.com/Lemoncode/node-training#readme",
+ "dependencies": {
+   "request": "^2.83.0"
+ }
}

```

- Import `request` lib:

### ./index.js

```diff
+ const request = require('request');

```

- Make http call to `lemoncode.net`:

### ./index.js

```diff
const request = require('request');

+ const responseHandler = (err, response, body) => {
+   if (!err && response.statusCode === 200) {
+     console.log(body);
+   }
+ };

+ request(
+   'http://www.leanmood.com',
+   responseHandler
+ );

```

- Press `F5` key to run app:

![run app](../../99%20Resources/01%20Modules/02%20NPM%20modules/run%20app.png)

- We could configure and execute [`npm scripts`](https://docs.npmjs.com/misc/scripts), for example `npm start` to run our app from console:

### ./package.json

```diff
{
  "name": "npm-modules-sample",
  "version": "1.0.0",
  "description": "How to create and configure a package.json file, install a npm third library and use it",
  "main": "index.js",
  "scripts": {
-   "test": "echo \"Error: no test specified\" && exit 1"
+   "start": "node index"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Lemoncode/node-training.git"
  },
  "author": "Lemoncode",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/Lemoncode/node-training/issues"
  },
  "homepage": "https://github.com/Lemoncode/node-training#readme",
  "dependencies": {
    "request": "^2.83.0"
  }
}

```

- Now, we could use it:

```bash
npm start
```

![npm start](../../99%20Resources/01%20Modules/02%20NPM%20modules/npm%20start.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
