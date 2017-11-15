# 01 SetImmediate

In this sample we are going to learn about `setImmediate` vs `setTimeout` methods.

Summary steps:

- Running `setImmediate` and `setTimeout` in main thread.
- Running `setImmediate` and `setTimeout` within an I/O cycle.

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

- `setImmediate` and `setTimeout` are similar but first one is designed to be executed in the `check` phase after the `poll` has has completed. The second one, schedules a script to be run after a minimum threshold in ms has elapsed.

- So, for example, if we run `setImmediate` and `setTimeout` in main thread:

### ./index.js
```diff
+ setTimeout(() => {
+   console.log('timeout');
+ }, 0);

+ setImmediate(() => {
+   console.log('immediate');
+ });

```

- Press `F5` key to run app:

![run main thread one](../../99%20Resources/02%20Concurrency%20Model%20and%20Event%20Loop/01%20SetImmediate/run%20main%20thread%20one.png)

![run main thread two](../../99%20Resources/02%20Concurrency%20Model%20and%20Event%20Loop/01%20SetImmediate/run%20main%20thread%20two.png)

- As we see, the two timers are executed is non-deterministic way, as it is bound by the performance of the process:

- However, if we running `setImmediate` and `setTimeout` within an I/O cycle, the immediate callback is always executed first:

### ./index.js
```diff
- setTimeout(() => {
-   console.log('timeout');
- }, 0);

- setImmediate(() => {
-   console.log('immediate');
- });
+ const fs = require('fs');

+ fs.readFile(__filename, () => {
+   setTimeout(() => {
+     console.log('timeout');
+   }, 0);
+   setImmediate(() => {
+     console.log('immediate');
+   });
+ });

```

![run io thread](../../99%20Resources/02%20Concurrency%20Model%20and%20Event%20Loop/01%20SetImmediate/run%20io%20thread.png)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
