# 03 FS Watch

In this sample we are going to implement `app` to watch files in specific folder.

Summary steps:

- Implement `logger` method in `helpers.js` file.
-

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _02 FS Truncate_ as starting point.

# Steps

- Delete `files/http.js` and remove previous `index.js` sample code.

- Implement `logger` method in `helpers.js` file:

### ./helpers.js

```diff
const path = require('path');
const fs = require('fs');

exports.resolveFilePath = (dirname) => (file) => path.join(dirname, file);

exports.getFiles = (dirname) => fs.readdirSync(dirname);

const getMillisecondsPerDay = () => 24 * 60 * 60 * 1000;
exports.getMillisecondsPerDay = getMillisecondsPerDay;

exports.convertToUnixEpoch = (index) => (
  (Date.now() - index * getMillisecondsPerDay()) / 1000
);

exports.convertToLocalDate = (unixEpoch) => (
  new Date(unixEpoch * 1000)
);

+ exports.logger = (message) => console.log(`${new Date().toUTCString()}: ${message}`);

```

- Add imports:

### ./index.js

```diff
+ const fs = require('fs');
+ const path = require('path');
+ const { logger, getFiles } = require('./helpers');
+ const dirname = path.join(__dirname, 'watch');

```

- We are going to implement two `event` handlers, `change` and `error`:

### ./index.js

```diff
const fs = require('fs');
const path = require('path');
const { logger, getFiles } = require('./helpers');
const dirname = path.join(__dirname, 'watch');

+ const filesWatcher = fs.watch(dirname);
+ filesWatcher.on('change', (event, filename) => {

+ });

+ filesWatcher.on('error', (err) => logger(err));

```

- We are going to implement two `event` handlers, `change` and `error`:

### ./index.js

```diff
const fs = require('fs');
const path = require('path');
const { logger, getFiles } = require('./helpers');
const dirname = path.join(__dirname, 'watch');

+ const filesWatcher = fs.watch(dirname);
+ filesWatcher.on('change', (event, filename) => {

+ });

+ filesWatcher.on('error', (err) => logger(err));

```

- We could differentiate between two events inside change handler, `rename` (for add or delete file) and `change` for update file:

### ./index.js

```diff
const fs = require('fs');
const path = require('path');
const { logger, getFiles } = require('./helpers');
const dirname = path.join(__dirname, 'watch');

+ const isAddOrDeleteOperation = (event) => event === 'rename';
+ const modifyHandler = (filename) => logger(`${filename} modified`);

const filesWatcher = fs.watch(dirname);
filesWatcher.on('change', (event, filename) => {
+ logger(`Event: ${event}, File name: ${filename}`);
+ if (isAddOrDeleteOperation(event)) {

+ } else {
+   modifyHandler(filename);
+ }
});

filesWatcher.on('error', (err) => logger(err));

```

- Now it's time to implement `add` and `delete` handlers:

### ./index.js

```diff
const fs = require('fs');
const path = require('path');
const { logger, getFiles } = require('./helpers');
const dirname = path.join(__dirname, 'watch');

const isAddOrDeleteOperation = (event) => event === 'rename';

+ const currentFiles = getFiles(dirname);
+ const resolveFileIndex = (filename) => currentFiles.indexOf(filename);

+ const isDeleteOperation = (index) => (index >= 0);

+ const deleteHandler = (filename, index) => {
+   currentFiles.splice(index, 1);
+   logger(`${filename} removed`);
+ };

+ const addHandler = (filename) => {
+   currentFiles.push(filename);
+   logger(`${filename} added`);
+ };

const modifyHandler = (filename) => logger(`${filename} modified`);

const filesWatcher = fs.watch(dirname);
filesWatcher.on('change', (event, filename) => {
  logger(`Event: ${event}, File name: ${filename}`);
  if (isAddOrDeleteOperation(event)) {
+   const index = resolveFileIndex(filename);
+   (isDeleteOperation(index)) ?
+     deleteHandler(filename, index) :
+     addHandler(filename);
  } else {
    modifyHandler(filename);
  }
});

filesWatcher.on('error', (err) => logger(err));

```

- Finally we have to create the `watch` folder and run app:

![run app](../../99%20Resources/05%20Built-in%20Libraries/03%20FS%20Watch/run%20app.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
