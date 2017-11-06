# 00 Handling Async Code

In this sample we are going to .

Summary steps:

-

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

-

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
