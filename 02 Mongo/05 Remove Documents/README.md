# 05 Remove Documents

In this sample we are going to implement some `database` business and create `queries` to `remove` documents.

Summary steps:

- Implement `deleteOne` and `deleteMany` methods.
- Implement `printDeleteResult` method.
- Update `index` file.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _04 Update Documents_ as starting point.

# Steps

- To implement `deleteOne` and `deleteMany` methods, we could rename `updateQueries` to `deleteQueries`:

### ./deleteQueries.js

```diff
- exports.updateOne = (dbPromise, collection) => (findQuery, updateQuery) => {
+ exports.deleteOne = (dbPromise, collection) => (findQuery) => {
  return new Promise((resolve, reject) => {
    dbPromise.then((db) => {
-     const result = db.collection(collection).updateOne(findQuery, updateQuery);
+     const result = db.collection(collection).deleteOne(findQuery);
      resolve(result);
    })
    .catch((error) => reject(error));
  });
};

- exports.updateMany = (dbPromise, collection) => (findQuery, updateQuery) => {
+ exports.deleteMany = (dbPromise, collection) => (findQuery) => {
  return new Promise((resolve, reject) => {
    dbPromise.then((db) => {
-     const result = db.collection(collection).updateMany(findQuery, updateQuery);
+     const result = db.collection(collection).deleteMany(findQuery);
      resolve(result);
    })
    .catch((error) => reject(error));
  });
};

```

- Implement `printDeleteResult` method:

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

exports.printUpdateResult = (printCallback, findCallback) => (findQuery, limit, updateQuery, updater) => {
  return updater(findQuery, updateQuery)
    .then((result) => {
      const cursor = findCallback(findQuery, limit);
      printCallback(cursor);
    });
};

+ exports.printDeleteResult = (findQuery, deleteBy) => {
+   return deleteBy(findQuery)
+     .then((result) => {
+       console.log(result);
+     });
+ };

```

- Update `index` file to `deleteOne`:

### ./index.js

```diff
const db = require('./database/db');
const { URL, COLLECTION } = require('./database/settings');
const inquirer = require('./database/inquirer');
- const { printFindResult, printUpdateResult } = require('./database/printer');
+ const { printDeleteResult } = require('./database/printer');
- const { updateOne, updateMany } = require('./updateQueries');
+ const { deleteOne, deleteMany } = require('./deleteQueries');

const dbPromise = db.connect(URL);
- dbPromise.then((db) => {
-   inquirer.initialize(db, COLLECTION);
- });

- const updateBy = printUpdateResult(printFindResult, inquirer.findWithLimit);

- updateBy(
+ printDeleteResult(
- { "address.zipcode": "10016" },
+ { "borough": "Queens" },
- 2,
- {
-   $set: { cuisine: "Category To Be Determined" },
-   $currentDate: { "lastModified": true },
- },
- updateMany(dbPromise, COLLECTION),
+ deleteOne(dbPromise, COLLECTION),
)
  .then(() => {
    db.close();
  })
  .catch((error) => {
    console.log(error);
    db.close();
  });

```

![delete one](../99%20Resources/05%20Delete%20Documents/delete%20one.gif)

- Update `index` file to `deleteMany`:

### ./index.js

```diff
const db = require('./database/db');
const { URL, COLLECTION } = require('./database/settings');
const inquirer = require('./database/inquirer');
const { printDeleteResult } = require('./database/printer');
const { deleteOne, deleteMany } = require('./deleteQueries');

const dbPromise = db.connect(URL);

printDeleteResult(
- { "borough": "Queens" },
+ { "borough": "Manhattan" },
- deleteOne(dbPromise, COLLECTION),
+ deleteMany(dbPromise, COLLECTION),
)
  .then(() => {
    db.close();
  })
  .catch((error) => {
    console.log(error);
    db.close();
  });

```

![delete many](../99%20Resources/05%20Delete%20Documents/delete%20many.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
