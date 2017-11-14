# 02 FS Truncate

In this sample we are going to create an app for truncate a corrupted file with duplicated code.

Summary steps:

-

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _01 FS Delete_ as starting point.

# Steps

- Delete `generateMockFiles.js` and remove previous `index.js` sample code.

- First, we are going to create a file with `corrupted code`:

### ./files/http.js

```javascript
const server = require('http').createServer();

server.on('request', (req, res) => {
  // req: http.IncomingMessage
  // res: http.ServerResponse
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

server.listen(3000);

console.log(`Server running on port 3000`);
const server = require('http').createServer();

server.on('request', (req, res) => {
  // req: http.IncomingMessage
  // res: http.ServerResponse
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

server.listen(3000);

console.log(`Server running on port 3000`);

```

- We could start adding `imports`:

### ./index.js

```diff
+ const fs = require('fs');
+ const path = require('path');
+ const dirname = path.join(__dirname, 'files');
+ const { resolveFilePath, getFiles } = require('./helpers');

```

- Get files to process:

### ./index.js

```diff
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'files');
const { resolveFilePath, getFiles } = require('./helpers');

+ const pathResolver = resolveFilePath(dirname);
+ const files = getFiles(dirname);

```

- Next step, it's create a generic function to `process files` passing as parameter the function to process single file:

### ./index.js

```diff
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'files');
const { resolveFilePath, getFiles } = require('./helpers');

+ const createProcessFiles = (files, pathResolver) => (processSingleFile) => {
+   files.forEach((filename) => {
+     const filepath = pathResolver(filename);
+     processSingleFile(filepath);
+   });
+ };

const pathResolver = resolveFilePath(dirname);
const files = getFiles(dirname);

+ const processFiles = createProcessFiles(files, pathResolver);

```

- CAMBIAR:

### ./index.js

```diff
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'files');
const { resolveFilePath, getFiles } = require('./helpers');

+ const resolveTruncateLength = (filePath) => {
+   return new Promise((resolve, reject) => {
+     fs.stat(filePath, (err, stats) => {
+       if (err) {
+         reject(err);
+       }
+       resolve(stats.size / 2);
+     });
+   });
+ };

+ const truncateData = (length, filePath) => {
+   return new Promise((resolve, reject) => {
+     console.log(length);
+     fs.truncate(filePath, length, (err) => {
+       if (err) {
+         reject(err);
+       }
+       resolve('success');
+     });
+   });
+ };

+ const processSingleFile = (filepath) => {
+   resolveTruncateLength(filepath)
+     .then((length) => truncateData(length, filepath))
+     .catch(err => console.log(err));
+ };

const createProcessFiles = (files, pathResolver) => (processSingleFile) => {
  files.forEach((filename) => {
    const filepath = pathResolver(filename);
    processSingleFile(filepath);
  });
};

const pathResolver = resolveFilePath(dirname);
const files = getFiles(dirname);

const processFiles = createProcessFiles(files, pathResolver);
+ processFiles(processSingleFile);

```

![run app](../../99%20Resources/05%20Built-in%20Libraries/02%20FS%20Truncate/run%20app.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
