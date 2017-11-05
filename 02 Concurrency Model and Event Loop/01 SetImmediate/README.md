# 01 SetImmediate

In this sample we are going to learn about `setImmediate` vs `setTimeout` methods.

Summary steps:

-

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _00 Slow Operation_ as starting point.

# Steps

- Remove previous `index.js` sample code.

### ./index.js

```diff
- const slowAdd = (a, b) => {
-   for (let index = 0; index < 999999999; index++) { }
-   return a + b;
- };

- const a = slowAdd(3, 3);
- const b = slowAdd(4, 4);
- const c = slowAdd(5, 5);

- console.log(a);
- console.log(b);
- console.log(c);

```

-

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
