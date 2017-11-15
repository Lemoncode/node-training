# 00 Built in

In this sample we are going to learn how to require Node `built-in` modules. As example we are going to use `os` module and show some methods like `hostname`, `loadavg` and `freemem`.

Summary steps:

- Remove previous sample code.
- Intro Node.js `built-in` modules.
- The `os` module.
- The `hostname` method.
- The `loadavg` method.
- The `freemem` method.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _03 Callback_ as starting point.

# Steps

- Remove previous sample code:

### ./index.js

```diff
- const maxTime = 2000;

- const oneWordToUpper = (value, callback) => {
-   const time = Math.floor((Math.random() * maxTime) + 1);
-   let error = null;
-   let result = null;
-   setTimeout(() => {
-     const splitted = value.split(' ');
-     console.log(splitted);
-     if (splitted.length > 1) {
-       error = { message: 'More than one word!' };
-     } else {
-       result = value.toUpperCase();
-       error = null;
-     }

-     callback(error, result, time);
-   }, time);
- };

- const handleResults = (error, result, time) => {
-   if (!!error) {
-     console.log(`Error: ${error.message}`);
-   } else {
-     console.log(`The word in upper: ${result}, the elapsed time: ${time} ms`);
-   }
- };

- const values = ['jaime', 'nasdan', 'daniel sanchez', 'jaime salas'];

- values.forEach(
-   (value) => oneWordToUpper(value, handleResults)
- );

```

- Node.js has a set of `built-in` modules without install any third library. Node has an API for each version, for example [v6.x](https://nodejs.org/docs/latest-v6.x/api/documentation.html), [v8.x](https://nodejs.org/dist/latest-v8.x/docs/api/documentation.html), etc.

- As example we are going to require [`os`](https://nodejs.org/docs/latest-v6.x/api/os.html) module. This module provides some `operating system-related` utility methods:

### ./index.js

```diff
+ const os = require('os');

```

- The `hostname` _method returns the hostname of the operating system as a string._:

### ./index.js

```diff
const os = require('os');

+ console.log(`Host: ${os.hostname()}`);

```

- Press `F5` key to run app:

![hostname method](../../99%20Resources/01%20Modules/00%20Built%20in/hostname%20method.png)

- The `loadavg` _method returns an array containing the 1, 5, and 15 minute load averages._ In this case, is a `UNIX-specific` concept, so is not compatible with Windows platforms.

### ./index.js

```diff
const os = require('os');

console.log(`Host: ${os.hostname()}`);
+ console.log(`15 min. load avarage ${os.loadavg()}`);

```

- `loadavg` in Windows, press `F5` key to run app:

![loadavg in windows](../../99%20Resources/01%20Modules/00%20Built%20in/loadavg%20in%20windows.png)

- `loadavg` in UNIX, press `F5` key to run app:

![loadavg in unix](../../99%20Resources/01%20Modules/00%20Built%20in/loadavg%20in%20unix.png)

- The `freemem` _method returns the amount of free system memory in bytes as an integer_:

### ./index.js

```diff
const os = require('os');

console.log(`Host: ${os.hostname()}`);
console.log(`15 min. load avarage ${os.loadavg()}`);

+ const toMb = (memory) => (
+   Math.round((memory / 1024 / 1024) * 100) / 100
+ );

+ console.log(`
+   ${toMb(os.freemem())} of ${toMb(os.totalmem())} Mb free
+ `);

```

- Press `F5` key to run app:

![freemem method](../../99%20Resources/01%20Modules/00%20Built%20in/freemem%20method.png)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
