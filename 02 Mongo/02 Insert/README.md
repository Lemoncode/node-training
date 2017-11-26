# 02 Insert

In this sample we are going to insert new `user` in `users` collection.

Summary steps:

- Remove the `createCollection` method.
- Create new `user`.
- Creat `insertUser` method.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _01 Create Database_ as starting point.

# Steps

- Since we have created the `users` collection, we could remove the `createCollection` method:

### ./index.js

```diff
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/chat';

MongoClient.connect(url)
  .then((db) => {
-   db.createCollection('users')
-     .then((res) => {
-       console.log('Collection created');
-       db.close();
-     })
-     .catch((error) => console.log(error));
  })
  .catch((error) => console.log(error));

```

- Now, we could start creating a new `user`:

### ./index.js

```diff
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/chat';

+ const createUser = () => ({
+   login: 'jaisal',
+   privilege: 'standard',
+   comments: [
+     {
+       date: new Date('2017-11-28T00:00:00Z'),
+       text: 'I have something to do',
+     },
+     {
+       date: new Date('2017-11-29T00:00:00Z'),
+       text: 'I still not remind what to do...',
+     },
+   ],
+ });

MongoClient.connect(url)
  .then((db) => {
+   const user = createUser();
  })
  .catch((error) => console.log(error));

```

- And finally, `insert` that user:

### ./index.js

```diff
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/chat';

const createUser = () => ({
  login: 'jaisal',
  privilege: 'standard',
  comments: [
    {
      date: new Date('2017-11-28T00:00:00Z'),
      text: 'I have something to do',
    },
    {
      date: new Date('2017-11-29T00:00:00Z'),
      text: 'I still not remind what to do...',
    },
  ],
});

+ const insertUser = (db, user) => (
+   db.collection('users')
+     .insertOne(user)
+     .then(() => {
+       console.log(`User ${user.login} inserted!`);
+       db.close();
+     })
+     .catch((error) => { throw error })
+ );

MongoClient.connect(url)
  .then((db) => {
    const user = createUser();
+   return insertUser(db, user);
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
s
# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
