# 04 Update Documents

In this sample we are going to implement some `database` business and create `queries` to `update` documents.

Summary steps:

- Create `settings` file.
- Extract `query` method to business.
- Extract `printFindResult` business.
- Implement `updateOne` method.
- Implement `updateMany` method.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _03 Query Documents_ as starting point.

# Steps

- We could start creating `settings` file:

### ./database/settings.js

```javascript
const URL = 'mongodb://localhost:27017/test';
const COLLECTION = 'restaurants';

module.exports = {
  URL,
  COLLECTION,
};

```

- Extract `query` method to business:

### ./database/inquirer.js

```javascript
module.exports = class Inquirer {
  constructor(db, collection) {
    if (!!db) {
      this.db = db;
    } else {
      throw 'db not initialized';
    }

    if (!!collection) {
      this.collection = collection;
    } else {
      throw 'collection not initialized';
    }
  }

  findWithLimit(query, limit = 1) {
    return this.db.collection(this.collection)
      .find(query)
      .limit(limit);
  }
}

```

- Using previous methods:

### ./index.js

```diff
const db = require('./database/db');
- const url = 'mongodb://localhost:27017/test';
+ const { URL, COLLECTION } = require('./database/settings');
+ const Inquirer = require('./database/inquirer');

- const findBy = (query, limit = 1, explain = false) => {
+ const findBy = (query, limit = 1) => {
- db.connect(url)
+ db.connect(URL)
    .then((db) => {
-     const cursor = db.collection('restaurants')
-       .find(query)
-       .limit(limit);
+     const inquirer = new Inquirer(db, COLLECTION);
+     const cursor = inquirer.findWithLimit(query, limit);

-     if (explain) {
-       cursor.explain()
-         .then((data) => {
-           console.log(data);
-           db.close();
-         });
-     }

      cursor.each((error, data) => {
        if (error) {
          throw error;
        }
        console.dir(data);
      });

      db.close();
    })
    .catch((error) => {
      console.error(error);
      db.close();
    });
};

findBy({ $or: [{ "cuisine": "Italian" }, { "address.zipcode": "10075" }] });

```

- As we see, there is something like we could extract so easy to `printFindResult`:

### ./database/printer.js

```javascript
exports.printFindResult = (cursor) => {
  cursor.each((error, data) => {
    if (error) {
      throw error;
    }
    console.dir(data);
  });
};

```

- Using previous methods:

### ./index.js

```diff
const db = require('./database/db');
const { URL, COLLECTION } = require('./database/settings');
const Inquirer = require('./database/inquirer');
+ const { printFindResult } = require('./database/printer');

const findBy = (query, limit = 1) => {
  db.connect(URL)
    .then((db) => {
      const inquirer = new Inquirer(db, COLLECTION);
      const cursor = inquirer.findWithLimit(query, limit);

-     cursor.each((error, data) => {
-       if (error) {
-         throw error;
-       }
-       console.dir(data);
-     });
+     printFindResult(cursor);

      db.close();
    })
    .catch((error) => {
      console.error(error);
      db.close();
    });
};

findBy({ $or: [{ "cuisine": "Italian" }, { "address.zipcode": "10075" }] });

```

- Implement `updateOne` method:

### ./updateQueries.js

```javascript

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
