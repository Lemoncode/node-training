# 05 Transform

In this sample we are going to play with `Transform` class from `stream` module.

Summary steps:

- Create a `Transform` stream to upper case.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _04 Duplex_ as starting point.

# Steps

- Remove previous `index.js` sample code.

- The `Transform` output is computed from its input. We don't have to implement the `read` or `write` methods because the `transform` combines both of them:

### ./index.js

```diff
+ const { Transform } = require('stream');

+ const upperCaseTransform = new Transform({
+   transform(chunck, encoding, callback) {
+     this.push(chunck.toString().toUpperCase());
+     callback();
+   }
+ });

+ process.stdin
+   .pipe(upperCaseTransform)
+   .pipe(process.stdout);

```

![run app](../../99%20Resources/06%20Streams/05%20Transform/run%20app.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
