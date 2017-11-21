# 04 Duplex

In this sample we are going to play with `Duplex` class from `stream` module.

Summary steps:

- Create a `Duplex` to get a `readable` and `writable` stream.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _03 Writable Stream_ as starting point.

# Steps

- Remove previous `index.js` sample code.

- We could implement both `readable` and `writable` stream with the same object using `Duplex`.

- For example, we are going to implement a Duplex with same behaviour as previous samples:

### ./index.js

```diff
+ const { Duplex } = require('stream');

+ const inOutStream = new Duplex({
+   write(chunk, encoding, callback) {
+     console.log(chunk.toString());
+     callback();
+   },

+   read(size) {
+     setTimeout(() => {
+       if (this.currentCharCode > 90) {
+         this.push(null);
+         return;
+       }
+       this.push(String.fromCharCode(this.currentCharCode++));
+     }, 100);
+   }
+ });

+ inOutStream.currentCharCode = 65;

```

- And `pipe` it to `process.stdout`:

### ./index.js

```diff
const { Duplex } = require('stream');

const inOutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },

  read(size) {
    setTimeout(() => {
      if (this.currentCharCode > 90) {
        this.push(null);
        return;
      }
      this.push(String.fromCharCode(this.currentCharCode++));
    }, 100);
  }
});

inOutStream.currentCharCode = 65;

+ process.stdin
+   .pipe(inOutStream)
+   .pipe(process.stdout);

```

![run app](../../99%20Resources/06%20Streams/04%20Duplex/run%20app.gif)

- It's very important to understand that the readable and writable sides of a duplex stream operate completely independently from one another. This is merely a grouping of two features into one object.

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
