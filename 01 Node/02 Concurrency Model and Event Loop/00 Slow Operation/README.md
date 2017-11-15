# 00 Slow Operation

In this sample we are going to demonstrate how to get a blocking code.

Summary steps:

- Implement a function to sum two numbers.
- Implement that function blocking the thread.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _02 NPM modules_ as starting point.

# Steps

- Remove previous `index.js` sample code and delete `package.json`.

### ./index.js

```diff
- const request = require('request');

- const responseHandler = (err, response, body) => {
-   if (!err && response.statusCode === 200) {
-     console.log(body);
-   }
- };

- request(
-   'http://www.leanmood.com',
-   responseHandler
- );

```

- First, we are going to create a simple function to sum two numbers:

### ./index.js
```diff
+ const add = (a, b) => {
+   return a + b;
+ };

+ const a = add(3, 3);
+ const b = add(4, 4);
+ const c = add(5, 5);

+ console.log(a);
+ console.log(b);
+ console.log(c);

```

- Running with `node index`:

```bash
node index
```

![run add method](../../99%20Resources/02%20Concurrency%20Model%20and%20Event%20Loop/00%20Slow%20Operation/run%20add%20method.png)

- How could we block the thread?:

### ./index.js
```diff
- const add = (a, b) => {
+ const slowAdd = (a, b) => {
+   for (let index = 0; index < 999999999; index++) { }
  return a + b;
};

- const a = add(3, 3);
+ const a = slowAdd(3, 3);
- const b = add(4, 4);
+ const b = slowAdd(4, 4);
- const c = add(5, 5);
+ const c = slowAdd(5, 5);

console.log(a);
console.log(b);
console.log(c);

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
