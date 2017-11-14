# 02 Readable Stream

In this sample we are going to play with `Readable` class from `stream` module.

Summary steps:

-

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _01 Reading Big Files_ as starting point.

# Steps

- Delete `createBigFile.js` and remove previous `index.js` sample code.

- We could start using `Readable` class from `stream` module to read data:

### ./index.js

```diff
+ const { Readable } = require('stream');

+ const inStream = new Readable();
+ inStream.push('ABCDEFGHILKLMNOPQRSTUVWXYZ');

```
- We have to `send null` to send a signal for `no more data`:

### ./index.js

```diff
const { Readable } = require('stream');

const inStream = new Readable();
inStream.push('ABCDEFGHILKLMNOPQRSTUVWXYZ');
+ inStream.push(null);

```

- To consume the stream, we could `pipe` it into `process.stdout`:

### ./index.js

```diff
const { Readable } = require('stream');

const inStream = new Readable();
inStream.push('ABCDEFGHILKLMNOPQRSTUVWXYZ');
inStream.push(null);

+ inStream.pipe(process.stdout);

```

![push test data](../../99%20Resources/06%20Streams/02%20Readable%20Stream/push%20test%20data.png)

- Now, instead of send all data, we could push partial data on demand:

### ./index.js

```diff
const { Readable } = require('stream');

- const inStream = new Readable();
- inStream.push('ABCDEFGHILKLMNOPQRSTUVWXYZ');
- inStream.push(null);
+ const inStream = new Readable({
+   read(size) {
+     this.push(String.fromCharCode(this.currentCharCode++));
+     if (this.currentCharCode > 90) {
+       this.push(null);
+     }
+   }
+ });

+ inStream.currentCharCode = 65;

inStream.pipe(process.stdout);

```

- The result is the same but now we are pushing data on demand. Let's add a delay to represent the `on demand` behaviour:

### ./index.js

```diff
const { Readable } = require('stream');

const inStream = new Readable({
  read(size) {
+   setTimeout(() => {
      this.push(String.fromCharCode(this.currentCharCode++));
      if (this.currentCharCode > 90) {
        this.push(null);
      }
+   }, 100);
  }
});

inStream.currentCharCode = 65;

inStream.pipe(process.stdout);

```

![push on demand](../../99%20Resources/06%20Streams/02%20Readable%20Stream/push%20on%20demand.gif)

- As we see, we ge the error `Error: stream.push() after EOF`. This is because we have a race condition while one timer push null, other try to push data after that.

- We could add a log for the `charCode` that try to put it after `null`:

### ./index.js

```diff
const { Readable } = require('stream');

const inStream = new Readable({
  read(size) {
    setTimeout(() => {
      this.push(String.fromCharCode(this.currentCharCode++));
      if (this.currentCharCode > 90) {
        this.push(null);
      }
    }, 100);
  }
});

inStream.currentCharCode = 65;

inStream.pipe(process.stdout);

+ process.on('exit', () => {
+   console.error(
+     `\n\ncurrentCharCode is ${inStream.currentCharCode}`
+   );
+ });

+ process.stdout.on('error', process.exit);

```

- To fix that:

### ./index.js

```diff
const { Readable } = require('stream');

const inStream = new Readable({
  read(size) {
    setTimeout(() => {
+     if (this.currentCharCode <= 90) {
        this.push(String.fromCharCode(this.currentCharCode++));
+     }
      if (this.currentCharCode > 90) {
        this.push(null);
      }
    }, 100);
  }
});
...

```

- Or:

### ./index.js

```diff
const { Readable } = require('stream');

const inStream = new Readable({
  read(size) {
    setTimeout(() => {
-     this.push(String.fromCharCode(this.currentCharCode++));
      if (this.currentCharCode > 90) {
        this.push(null);
+       return;
      }
+     this.push(String.fromCharCode(this.currentCharCode++));
    }, 100);
  }
});
...

```

![fix sample](../../99%20Resources/06%20Streams/02%20Readable%20Stream/fix%20sample.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
