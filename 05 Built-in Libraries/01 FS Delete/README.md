# 01 FS Delete

In this sample we are going to create an app for delete files older than 7 days.

Summary steps:

- Create `helpers.js` file to create some reusable methods.
- Create `generateMockFiles.js` to create files to be deleted.
- Create `index.js` to delete files older than a week.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _00 OS_ as starting point.

# Steps

- Remove previous `index.js` sample code.

### ./index.js

```diff
- const os = require('os');

- console.log(os.cpus());

- console.log(os.networkInterfaces());

- console.log(os.freemem());

- console.log(os.type());

- console.log(os.release());

- console.log(os.userInfo());

```

- First, we are going to create `helpers.js` file to create some reusable methods:

### ./helpers.js

```javascript
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

```

- Now, we are going to create `generateMockFiles.js`. This `app` will create 10 files and it's going to modify the file `date` from `Date.now` until `9` days before to `simulate` differents `creation timestamps`:

### ./generateMockFiles.js

```javascript
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'old');
const { resolveFilePath, convertToUnixEpoch, convertToLocalDate } = require('./helpers');
const pathResolver = resolveFilePath(dirname);

```

- Create folder with name `old`, to be placed files:

### ./generateMockFiles.js

```diff
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'old');
const { resolveFilePath, convertToUnixEpoch, convertToLocalDate } = require('./helpers');
const pathResolver = resolveFilePath(dirname);

+ if (!fs.existsSync(dirname)) {
+   fs.mkdirSync(dirname);
+ }

```

- Create `10` file names and paths:

### ./generateMockFiles.js

```diff
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'old');
const { resolveFilePath, convertToUnixEpoch, convertToLocalDate } = require('./helpers');
const pathResolver = resolveFilePath(dirname);

if (!fs.existsSync(dirname)) {
  fs.mkdirSync(dirname);
}

+ const iterations = new Array(10).fill(null);

+ iterations.forEach((value, index) => {
+   const filePath = pathResolver(`files${index}`);
+ });


```

- Save files with `locale date` as data:

### ./generateMockFiles.js

```diff
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'old');
const { resolveFilePath, convertToUnixEpoch, convertToLocalDate } = require('./helpers');
const pathResolver = resolveFilePath(dirname);

if (!fs.existsSync(dirname)) {
  fs.mkdirSync(dirname);
}

+ const writeFilePromise = (filePath, data) => {
+   return new Promise((resolve, reject) => {
+     fs.writeFile(filePath, data, (err) => {
+       if (err) {
+         reject(err);
+       }
+       resolve('success');
+     });
+   });
+ };

const iterations = new Array(10).fill(null);

iterations.forEach((value, index) => {
  const filePath = pathResolver(`files${index}`);
+ const unixEpoch = convertToUnixEpoch(index);
+ const time = convertToLocalDate(unixEpoch).toLocaleString();
+ writeFilePromise(filePath, time)
+   .then((result) => {
+     console.log(index);
+   })
+   .catch((err) => console.log(err));
});

```

- Change file `creation timestamps`:

### ./generateMockFiles.js

```diff
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'old');
const { resolveFilePath, convertToUnixEpoch, convertToLocalDate } = require('./helpers');
const pathResolver = resolveFilePath(dirname);

if (!fs.existsSync(dirname)) {
  fs.mkdirSync(dirname);
}

const writeFilePromise = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject(err);
      }
      resolve('success');
    });
  });
};

+ const changeTimestampPromise = (filepath, time) => {
+   return new Promise((resolve, reject) => {
+     fs.utimes(filepath, time, time, (err) => {
+       if (err) {
+         reject(err);
+       }
+       resolve('success');
+     });
+   });
+ };

const iterations = new Array(10).fill(null);

iterations.forEach((value, index) => {
  const filePath = pathResolver(`files${index}`);
  const unixEpoch = convertToUnixEpoch(index);
  const time = convertToLocalDate(unixEpoch).toLocaleString();
  writeFilePromise(filePath, time)
    .then((result) => {
      console.log(index);
+     return changeTimestampPromise(filePath, unixEpoch);
    })
+   .then((result) => console.log(result))
    .catch((err) => console.log(err));
});

```

- Run `generateMockFiles`:

![generate mock files](../../99%20Resources/05%20Built-in%20Libraries/01%20FS%20Delete/generate%20mock%20files.gif)

- Finally, we could implement `index.js` to delete files older than a week:

### ./index.js

```diff
+ const fs = require('fs');
+ const path = require('path');
+ const dirname = path.join(__dirname, 'old');
+ const { resolveFilePath, getFiles, getMillisecondsPerDay } = require('./helpers');
+ const pathResolver = resolveFilePath(dirname);

```

- Get files from `old` folder:

### ./index.js

```diff
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'old');
const { resolveFilePath, getFiles, getMillisecondsPerDay } = require('./helpers');
const pathResolver = resolveFilePath(dirname);

+ const files = getFiles(dirname);

+ files.forEach((file) => {
+   const filePath = pathResolver(file);
+ });

```

- Get `creation timestamp` for each file:

### ./index.js

```diff
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'old');
const { resolveFilePath, getFiles, getMillisecondsPerDay } = require('./helpers');
const pathResolver = resolveFilePath(dirname);

+ const resolveMtime = (filePath) => {
+   return new Promise((resolve, reject) => {
+     fs.stat(filePath, (err, stats) => {
+       if (err) {
+         reject(err);
+       }
+       resolve(stats.mtime);
+     });
+   });
+ };

const files = getFiles(dirname);

files.forEach((file) => {
  const filePath = pathResolver(file);
+ resolveMtime(filePath)
+   .then((result) => {
+     console.log(result);
+   })
+   .catch((err) => console.log(err));
});

```

- Remove file `older than a week`:

### ./index.js

```diff
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'old');
const { resolveFilePath, getFiles, getMillisecondsPerDay } = require('./helpers');
const pathResolver = resolveFilePath(dirname);

const resolveMtime = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats.mtime);
    });
  });
};

+ const hasToBeUnlink = (mtime) => {
+   const millisecondsPerWeek = 7 * getMillisecondsPerDay()
+   const olderThanAWeek = Date.now() - mtime.getTime() > millisecondsPerWeek;
+   return olderThanAWeek;
+ };

+ const resolveUnlink = (filePath) => {
+   return new Promise((resolve, reject) => {
+     fs.unlink(filePath, (err) => {
+       if (err) {
+         reject(err);
+       }

+       resolve(filePath);
+     });
+   });
+ };

const files = getFiles(dirname);

files.forEach((file) => {
  const filePath = pathResolver(file);
  resolveMtime(filePath)
    .then((result) => {
-     console.log(result);
+     if (hasToBeUnlink(result)) {
+       return resolveUnlink(filePath);
+     }
    })
+   .then((file) => {
+     if (file) {
+       console.log(`The file has been deleted ${file}`)
+     }
+   })
    .catch((err) => console.log(err));
});

```

![delete files](../../99%20Resources/05%20Built-in%20Libraries/01%20FS%20Delete/delete%20files.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
