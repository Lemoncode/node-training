# 03 Writable Stream

In this sample we are going to play with `Writable` class from `stream` module.

Summary steps:

- Create a simple `echo` stream.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _02 Readable Stream_ as starting point.

# Steps

- Remove previous `index.js` sample code.

- We could implement it in many ways including extending the `Writable` class.

- To create new `Writable` stream we need implement the `write` function. It is used to send data to the resource.

- This method take 3 args:

    - `chunk`: is usually a buffer unless we configure the stream.
    - `enconding`
    - `callback`: to call after we process the `chunk`.

- We could implement to create an `echo` stream:

### ./index.js

```diff
+ const { Writable } = require('stream');

+ const outStream = new Writable({
+   write(chunk, encoding, callback) {
+     console.log(chunk.toString());
+     callback();
+   }
+ });

```

- To consume it, we could use `process.stdin`:

### ./index.js

```diff
const { Writable } = require('stream');

const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
});

+ process.stdin.pipe(outStream);

```

![run app](../../99%20Resources/06%20Streams/03%20Writable%20Stream/run%20app.gif)

- The code above it's already built-in. So, we get the same result:

### ./index.js

```diff
- const { Writable } = require('stream');

- const outStream = new Writable({
-   write(chunk, encoding, callback) {
-     console.log(chunk.toString());
-     callback();
-   }
- });

- process.stdin.pipe(outStream);
+ process.stdin.pipe(process.stdout);
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
