# 06 Zip

In this sample we are going to use the `zlib` module to crompress a file and using `streams` and `pipes`.

Summary steps:

- Create `test` file to be compressed.
- Implement the `compress` method.
- Print `console.log` when finish.
- Print `progress` indicator using `on` event.
- Print `progress` indicator using `Transform`.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _05 Transform_ as starting point.

# Steps

- Remove previous `index.js` sample code.

- We are going to create `test` file to be compressed:

### ./test.js

```javascript
console.log('I am the test file');

```

- Now, we are going to use `zlib` to compress previous file getting the file name from terminal:

### ./index.js

```diff
+ const fs = require('fs');
+ const zlib = require('zlib');

+ const fileName = process.argv[2];

+ fs.createReadStream(fileName)
+   .pipe(zlib.createGzip())
+   .pipe(fs.createWriteStream(`${fileName}.gz`));

```

![compress file](../../99%20Resources/06%20Streams/06%20Zip/compress%20file.gif)

- The cool thing about `pipes` is that we could combine with events if need it.

- For example, we could `console.log` a `done` message when it write the file into file system after compression. We will need to use the `finish` event on the writable stream:

### ./index.js

```diff
const fs = require('fs');
const zlib = require('zlib');

const fileName = process.argv[2];

fs.createReadStream(fileName)
  .pipe(zlib.createGzip())
- .pipe(fs.createWriteStream(`${fileName}.gz`));
+ .pipe(fs.createWriteStream(`${fileName}.gz`))
+ .on('finish', () => console.log('Done'));

```

![done message](../../99%20Resources/06%20Streams/06%20Zip/done%20message.png)

- We could show a progress indicator using the `data` event handler:

### ./index.js

```diff
const fs = require('fs');
const zlib = require('zlib');

const fileName = process.argv[2];

fs.createReadStream(fileName)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(`${fileName}.gz`))
  .on('finish', () => console.log('Done'));

```

![progress indicator](../../99%20Resources/06%20Streams/06%20Zip/progress%20indicator.png)

- What is great about `pipe` is that we could use it to compose our program piece by piece. Instead of listening the data event, we could create a `transform` to report progress:

### ./index.js

```diff
const fs = require('fs');
const zlib = require('zlib');
+ const { Transform } = require('stream');

const fileName = process.argv[2];

+ const progress = new Transform({
+   transform(chunck, encoding, callback) {
+     process.stdout.write('.');
+     callback(null, chunck);
+   }
+ });

fs.createReadStream(fileName)
  .pipe(zlib.createGzip())
- .on('data', () => process.stdout.write('.'))
+ .pipe(progress)
  .pipe(fs.createWriteStream(`${fileName}.gz`))
  .on('finish', () => console.log('Done'));

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
