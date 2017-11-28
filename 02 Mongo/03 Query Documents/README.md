# 03 Query Documents

In this sample we are going to reuse the `db` object and create `queries` to `find` documents.

Summary steps:

- Create business to reuse `db`.
- Import `data` from `.json`.
- Find data in `restaurants` collection.
- Refactor to reuse `find` query.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _02 Insert_ as starting point.

# Steps

- As we see in previous sample, we could increase performance reusing the `db` object, so we could create a business for that:

### ./database/db.js

```javascript
const { MongoClient } = require('mongodb');

const state = {
  db: null,
};

exports.connect = (url) => {
  return new Promise((resolve, reject) => {
    if (state.db) {
      return resolve('Already connected');
    }

    MongoClient.connect(url)
      .then((db) => {
        state.db = db;
        resolve(state.db);
      })
      .catch((error) => reject(error));
  });
};

exports.close = (done = () => { }) => {
  if (state.db) {
    state.db.close((error) => {
      state.db = null;
      done(error);
    });
  }
};

```

- We are going to use `test` db again. This time, we could import `restaurants` collection from a `.json` file. We need to download this [.json](https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json):

```bash
mongod
```

```bash
mongoimport --db test --collection restaurants --drop --file primer-dataset.json
```

> - `drop` flag to remove all previous data.

> - `file` path to the json file.

![import data](../99%20Resources/03%20Query%20Documents/import%20data.gif)

- This bring us 25359 documents, nice to test some features. Now, we could update `index` file to launch some `queries`:

### ./index.js

```diff
- const { MongoClient } = require('mongodb');
+ const db = require('./database/db');
- const url = 'mongodb://localhost:27017/chat';
+ const url = 'mongodb://localhost:27017/test';

- const createUser = () => ({
-   login: 'jaisal',
-   privilege: 'standard',
-   comments: [
-     {
-       date: new Date('2017-11-28T00:00:00Z'),
-       text: 'I have something to do',
-     },
-     {
-       date: new Date('2017-11-29T00:00:00Z'),
-       text: 'I still not remind what to do...',
-     },
-   ],
- });

- const insertUser = (db, user) => (
-   db.collection('users')
-     .insertOne(user)
-     .then(() => {
-       console.log(`User ${user.login} inserted!`);
-       db.close();
-     })
-     .catch((error) => { throw error })
- );

- MongoClient.connect(url)
-   .then((db) => {
-     const user = createUser();
-     return insertUser(db, user);
-   })
-   .catch((error) => console.log(error));

```

- Find `50` restaurants:

### ./index.js

```diff
const db = require('./database/db');
const url = 'mongodb://localhost:27017/test';

+ db.connect(url)
+   .then((db) => {
+     const cursor = db.collection('restaurants')
+       .find()
+       .limit(50);

+     cursor.each((error, data) => {
+       if (error) {
+         throw error;
+       }
+       console.dir(data);
+     });
+   })
+   .catch((error) => {
+     console.error(error);
+     db.close();
+   });

```

- Run query:

```bash
mongod
```

```bash
npm start
```

![find query](../99%20Resources/03%20Query%20Documents/find%20query.gif)

- Let's refactor this, so we could pass filter to the find function:

### ./index.js

```diff
const db = require('./database/db');
const url = 'mongodb://localhost:27017/test';

+ const findBy = (query, limit = 1, explain = false) => {
    db.connect(url)
      .then((db) => {
        const cursor = db.collection('restaurants')
-         .find()
+         .find(query)
-         .limit(50);
+         .limit(limit);

+       if (explain) {
+         cursor.explain()
+           .then((data) => {
+             console.log(data);
+             db.close();
+           });
+       }

        cursor.each((error, data) => {
          if (error) {
            throw error;
          }
          console.dir(data);
        });

+       db.close();
      })
      .catch((error) => {
        console.error(error);
        db.close();
      });
+ };

+ findBy({ "borough": "Manhattan" });

```

> - `explain` return info about `query stats`.

- Run query:

```bash
mongod
```

```bash
npm start
```

![findByd](../99%20Resources/03%20Query%20Documents/findBy.gif)

- For a nested field, we could:

### ./index.js

```diff
...

- findBy({ "borough": "Manhattan" });
+ findBy({ "address.zipcode": "10075" });

```

- In arrays we could do the same:

### ./index.js

```diff
...

- findBy({ "address.zipcode": "10075" });
+ findBy({ "grades.grade": "B" });

```

- We could specify conditions with `operators` like `$gt` (greater than):

### ./index.js

```diff
...

- findBy({ "grades.grade": "B" });
+ findBy({ "grades.score": { $gt: 30 } });

```

- `$lt` (lower than):

### ./index.js

```diff
...

- findBy({ "grades.score": { $gt: 30 } });
+ findBy({ "grades.score": { $lt: 10 } });

```

- Combine conditions (AND), separated by comma:

### ./index.js

```diff
...

- findBy({ "grades.score": { $lt: 10 } });
+ findBy({ "cuisine": "Italian", "address.zipcode": "10075" });

```

- Using `$or`:

### ./index.js

```diff
...

- findBy({ "cuisine": "Italian", "address.zipcode": "10075" });
+ findBy({ $or: [{ "cuisine": "Italian" }, { "address.zipcode": "10075" }] });

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
