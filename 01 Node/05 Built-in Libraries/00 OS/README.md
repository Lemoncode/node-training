# 00 OS

In this sample we are going to see some `os` module methods.

Summary steps:

- `cpus` method.
- `networkInterfaces` method.
- `freemem` method.
- `type` method.
- `release` method.
- `userInfo` method.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _03 Routes_ as starting point.

# Steps

- Delete `home.html` and remove previous `index.js` sample code.

- Node provides a number of utilities to access information directly from the operating system.

- We could read info about cpu's with `cpus` method:

### ./index

```diff
+ const os = require('os');

+ console.log(os.cpus());

```

- We could read info about network interfaces with `networkInterfaces` method:

### ./index

```diff
const os = require('os');

console.log(os.cpus());

+ console.log(os.networkInterfaces());

```

- We could read total and free memory with `freemem` method.

### ./index

```diff
const os = require('os');

console.log(os.cpus());

console.log(os.networkInterfaces());

+ console.log(os.freemem());

```

- What operating system it was compile for with `type` method.

### ./index

```diff
const os = require('os');

console.log(os.cpus());

console.log(os.networkInterfaces());

console.log(os.freemem());

+ console.log(os.type());

```

- The release operating system version with `release` method.

### ./index

```diff
const os = require('os');

console.log(os.cpus());

console.log(os.networkInterfaces());

console.log(os.freemem());

console.log(os.type());

+ console.log(os.release());

```

- We could read info about current user with `userInfo` method.

### ./index

```diff
const os = require('os');

console.log(os.cpus());

console.log(os.networkInterfaces());

console.log(os.freemem());

console.log(os.type());

console.log(os.release());

+ console.log(os.userInfo());

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
