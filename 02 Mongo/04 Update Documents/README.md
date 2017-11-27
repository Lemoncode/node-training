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
const inquirer = {
  db: null,
  collection: null,
  isInitialized: false,
};

const initialize = (db, collection) => {
  if (!!db) {
    inquirer.db = db;
  } else {
    throw 'db not initialized';
  }

  if (!!collection) {
    inquirer.collection = collection;
  } else {
    throw 'Collection not initialized';
  }

  inquirer.isInitialized = true;
};

const findWithLimit = (query, limit = 1) => {
  if (inquirer.isInitialized) {
    return inquirer.db.collection(inquirer.collection)
      .find(query)
      .limit(limit);
  } else {
    throw 'Not initialized';
  }
};

module.exports = {
  initialize,
  findWithLimit
};

```

- Using previous methods:

### ./index.js

```diff
const db = require('./database/db');
- const url = 'mongodb://localhost:27017/test';
+ const { URL, COLLECTION } = require('./database/settings');
+ const inquirer = require('./database/inquirer');

- const findBy = (query, limit = 1, explain = false) => {
+ const findBy = (query, limit = 1) => {
- db.connect(url)
+ db.connect(URL)
    .then((db) => {
-     const cursor = db.collection('restaurants')
-       .find(query)
-       .limit(limit);
+     inquirer.initialize(db, COLLECTION);
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
const inquirer = require('./database/inquirer');
+ const { printFindResult } = require('./database/printer');

const findBy = (query, limit = 1) => {
  db.connect(URL)
    .then((db) => {
      inquirer.initialize(db, COLLECTION);
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
exports.updateOne = (dbPromise, collection) => (findQuery, updateQuery) => {
  return new Promise((resolve, reject) => {
    dbPromise.then((db) => {
      const result = db.collection(collection).updateOne(findQuery, updateQuery);
      resolve(result);
    })
    .catch((error) => reject(error));
  });
};

```

- And implement `printUpdateResult` method:

### ./database/printer.js

```diff
exports.printFindResult = (cursor) => {
  cursor.each((error, data) => {
    if (error) {
      throw error;
    }
    console.dir(data);
  });
};

+ exports.printUpdateResult = (printCallback, findCallback) => (findQuery, limit, updateQuery, updater) => {
+   return updater(findQuery, updateQuery)
+     .then((result) => {
+       const cursor = findCallback(findQuery, limit);
+       printCallback(cursor);
+     });
+ };

```

- Use it in `index`:

### ./index.js

```diff
const db = require('./database/db');
const { URL, COLLECTION } = require('./database/settings');
const inquirer = require('./database/inquirer');
- const { printFindResult } = require('./database/printer');
+ const { printFindResult, printUpdateResult } = require('./database/printer');
+ const { updateOne } = require('./updateQueries');

- const findBy = (query, limit = 1) => {
-   db.connect(URL)
-     .then((db) => {
-       const inquirer = new Inquirer(db, COLLECTION);
-       const cursor = inquirer.findWithLimit(query, limit);

-       printFindResult(cursor);

-       db.close();
-     })
-     .catch((error) => {
-       console.error(error);
-       db.close();
-     });
- };

- findBy({ $or: [{ "cuisine": "Italian" }, { "address.zipcode": "10075" }] });
+ const dbPromise = db.connect(URL);
+ dbPromise.then((db) => {
+   inquirer.initialize(db, COLLECTION);
+ });

+ const updateBy = printUpdateResult(printFindResult, inquirer.findWithLimit);

+ updateBy(
+   { "name": "Juni" },
+   1,
+   {
+     $set: { "cuisine": "American (New)" },
+     $currentDate: { "lastModified": true },
+   },
+   updateOne(dbPromise, COLLECTION),
+ )
+   .then(() => {
+     db.close();
+   })
+   .catch((error) => {
+     console.log(error);
+     db.close();
+   });

```

![update one](../99%20Resources/04%20Update%20Documents/update%20one.gif)

- We coul update nested properties using:

### ./index.js

```diff
...

updateBy(
- { "name": "Juni" },
+ { "restaurant_id": "41156888" },
  1,
  {
-   $set: { "cuisine": "American (New)" },
+   $set: { "address.street": "East 31st Street" },
-   $currentDate: { "lastModified": true },
  },
  updateOne(dbPromise, COLLECTION),
)
...

```

![nested property](../99%20Resources/04%20Update%20Documents/nested%20property.gif)

- Implement `updateOne` method:

### ./updateQueries.js

```diff
exports.updateOne = (dbPromise, collection) => (findQuery, updateQuery) => {
  return new Promise((resolve, reject) => {
    dbPromise.then((db) => {
      const result = db.collection(collection).updateOne(findQuery, updateQuery);
      resolve(result);
    })
    .catch((error) => reject(error));
  });
};

+ exports.updateMany = (dbPromise, collection) => (findQuery, updateQuery) => {
+   return new Promise((resolve, reject) => {
+     dbPromise.then((db) => {
+       const result = db.collection(collection).updateMany(findQuery, updateQuery);
+       resolve(result);
+     })
+     .catch((error) => reject(error));
+   });
+ };

```

- Update `index`:

### ./index.js

```diff
const db = require('./database/db');
const { URL, COLLECTION } = require('./database/settings');
const inquirer = require('./database/inquirer');
const { printFindResult, printUpdateResult } = require('./database/printer');
- const { updateOne } = require('./updateQueries');
+ const { updateOne, updateMany } = require('./updateQueries');

const dbPromise = db.connect(URL);
dbPromise.then((db) => {
  inquirer.initialize(db, COLLECTION);
});

const updateBy = printUpdateResult(printFindResult, inquirer.findWithLimit);

updateBy(
- { "restaurant_id": "41156888" },
+ { "address.zipcode": "10016" },
- 1,
+ 2,
  {
-   $set: { "address.street": "East 31st Street" },
+   $set: { cuisine: "Category To Be Determined" },
+   $currentDate: { "lastModified": true },
  },
- updateOne(dbPromise, COLLECTION),
+ updateMany(dbPromise, COLLECTION),
)
  .then(() => {
    db.close();
  })
  .catch((error) => {
    console.log(error);
    db.close();
  });

```

![update many](../99%20Resources/04%20Update%20Documents/update%20many.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
