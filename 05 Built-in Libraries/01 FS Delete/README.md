# 01 FS Delete

In this sample we are going to

Summary steps:

- Create `helpers.js` file to create some reusable methods.

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

exports.logger = (message) => console.log(`${new Date().toUTCString()}: ${message}`);

```

-

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
