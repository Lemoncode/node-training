# 01 Create Database

In this sample we are going to create a new `database` and `collection` and connect to it.

Summary steps:

- Update `url` to create `chat` database.
- Use `promises` instead of callback.
- Create `users` collection.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _00 Intro - 01 Connect MongoClient_ as starting point.

# Steps

- Update `url` to create `chat` database:

### ./index.js

```diff
const { MongoClient } = require('mongodb');

- const url = 'mongodb://localhost:27017/test';
+ const url = 'mongodb://localhost:27017/chat';

MongoClient.connect(url, (error, db) => {
  console.log('Success');
  db.close();
});

```

- We could use `promises` instead of callback to keep clean code:

### ./index.js

```diff
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/chat';

- MongoClient.connect(url, (error, db) => {
-   console.log('Success');
-   db.close();
- });
+ MongoClient.connect(url)
+   .then((db) => {

+   })
+   .catch((error) => console.log(error));

```

- To create new `collection` we have to use the `createCollection` method:

### ./index.js

```diff
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/chat';

MongoClient.connect(url)
  .then((db) => {
+   db.createCollection('users')
+     .then((res) => {
+       console.log('Collection created');
+       db.close();
+     })
+     .catch((error) => console.log(error));
  })
  .catch((error) => console.log(error));

```

- To run app we need two terminals now. Remember that we need to execute `mongod` first:

```bash
mongod
```

```bash
npm start
```

![run app](../99%20Resources/01%20Create%20Database/run%20app.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
