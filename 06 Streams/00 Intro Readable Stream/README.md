# 00 Intro Readable Stream

In this sample we are going to send an http `request` to understand a `readable stream`.

Summary steps:

- Install `request` library.
- Create a `readable` stream from `request`.
- Implement `data` handler.
- Implement `end` handler.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _03 FS Watch_ as starting point.

# Steps

- Delete `helpers.js`, `watch` folder and remove previous `index.js` sample code.

- Create a `package.json` to install third party libraries:

```bash
npm init
```

- Install `request` package:

```bash
npm install request --save
```

- Create a `readable` stream from `request`:

### ./index.js

```diff
+ const request = require('request');

+ const readableStream = request('http://www.leanmood.com/');

```

- Implement `data` handler:

### ./index.js

```diff
const request = require('request');

const readableStream = request('http://www.leanmood.com/');

+ const dataHandler = (counter) => (chunk) => {
+   console.log(`Data: ${chunk}`);
+   setTimeout(() => console.log(`Chunk processed ${++counter}`), 3000);
+ };

+ readableStream.on('data', dataHandler(0));

```

- Implement `end` handler:

### ./index.js

```diff
const request = require('request');

const readableStream = request('http://www.leanmood.com/');

const dataHandler = (counter) => (chunk) => {
  console.log(`Data: ${chunk}`);
  setTimeout(() => console.log(`Chunk processed ${++counter}`), 3000);
};

+ const endHandler = () => console.log('Finished.');

readableStream.on('data', dataHandler(0));
+ readableStream.on('end', endHandler);

```

![run app](../../99%20Resources/06%20Streams/00%20Intro%20Readable%20Stream/run%20app.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
