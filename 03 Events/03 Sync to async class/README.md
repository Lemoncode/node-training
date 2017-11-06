# 03 Sync to async class

In this sample we are going to .


Summary steps:

-

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _02 External emitter_ as starting point.

# Steps

- Delete `retriever.js` file and remove previous `index.js` sample code.

### ./index.js

```diff
- const Retriever = require('./retriever');

- const retrieverHandler = new Retriever(10);
- retrieverHandler.on('start', () => console.log('Started'));
- retrieverHandler.on('data', (data) => console.log(`Data: ${data}`));
- retrieverHandler.on('end', (data) => console.log(`End data: ${data}`));

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
