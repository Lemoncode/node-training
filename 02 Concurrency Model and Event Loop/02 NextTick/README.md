# 02 NextTick

In this sample we are going to learn how to use `nextTick` method.

Summary steps:

-

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

-

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
