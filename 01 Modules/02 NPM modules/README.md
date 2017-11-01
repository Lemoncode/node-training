# 02 NPM modules

In this sample we are going to

Summary steps:

- Remove previous sample code.
- Delete `mathfun.js` file.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _01 File module_ as starting point.

# Steps

- Remove previous `index.js` sample code.

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

- Delete `mathfun.js` file.

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
