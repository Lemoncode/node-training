# 01 Connect MongoClient

In this sample we are going to install `mongodb` via `npm` and use it to create a connection with a database.

Summary steps:

- Create `package.json`.
- Install `mongodb`.
- Update npm `scripts`.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _00 Installing Mongo_ as starting point.

# Steps

- First step is create a `package.json` file where we are going to install all `local` third party libraries that we are going to use to implement this sample:

```bash
npm init
```

- We get something like:

### ./package.json

```json
{
  "name": "mongo-samples",
  "version": "1.0.0",
  "description": "Samples to work with MongoDB",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "mongodb",
    "node",
    "samples"
  ],
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

- To work with `MongoDB` we need to install the npm package `mongodb`:

```bash
npm install mongodb --save
```

- How we could use it to `connect` to a database? We need to import `MongoClient` static class that it provides the `connect` method:

### ./index.js

```javascript
const { MongoClient } = require('mongodb');

```

- The `connect` method needs to be feeded by an `url` to the database. A valid `url` is something like:

  - 'mongodb://`host`:`port`/`dataBaseName`'

- We are going to use a `local` database so we could format this `url` like:

### ./index.js

```diff
const { MongoClient } = require('mongodb');

+ const url = 'mongodb://localhost:27017/test';

```

- The most important

- We could configure and execute [`npm scripts`](https://docs.npmjs.com/misc/scripts), for example `npm start` to run our app from console:

### ./package.json

```diff
{
  "name": "mongo-samples",
  "version": "1.0.0",
  "description": "Samples to work with MongoDB",
  "main": "index.js",
  "scripts": {
-   "test": "echo \"Error: no test specified\" && exit 1"
+   "start": "node index"
  },
....
}

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
