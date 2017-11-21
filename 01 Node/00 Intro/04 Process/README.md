# 04 Process

In this sample we are going to use the global object `process` and playing with the `exit` and `uncaughtException` events.

Summary steps:

- Keep node process busy.
- Throw exception and see whats happends.
- Using `exit` event.
- Using `uncaughtException` event.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _03 Callback_ as starting point.

# Steps

- Remove previous sample code.

### ./index.js

```diff
- const maxTime = 2000;

- const oneWordToUpper = (value, callback) => {
-   const time = Math.floor((Math.random() * maxTime) + 1);
-   let error = null;
-   let result = null;
-   setTimeout(() => {
-     const splitted = value.split(' ');
-     console.log(splitted);
-     if (splitted.length > 1) {
-       error = { message: 'More than one word!' };
-     } else {
-       result = value.toUpperCase();
-       error = null;
-     }

-     callback(error, result, time);
-   }, time);
- };

- const handleResults = (error, result, time) => {
-   if (!!error) {
-     console.log(`Error: ${error.message}`);
-   } else {
-     console.log(`The word in upper: ${result}, the elapsed time: ${time} ms`);
-   }
- };

- const values = ['jaime', 'nasdan', 'daniel sanchez', 'jaime salas'];

- values.forEach(
-   (value) => oneWordToUpper(value, handleResults)
- );

```

- [process](https://nodejs.org/docs/latest-v6.x/api/process.html) _is a global object that provides information about, and control over, the current Node.js process._ Also, it is an instance of `EventEmitter` so we could access to some `process` event handlers like `exit`, `beforeExit`, ` uncaughtException`, etc.

- First, we are going to keep the process busy to avoid Node finished using [`stdin`](https://nodejs.org/docs/latest-v6.x/api/process.html#process_process_stdin) property:

### ./index.js

```diff
+ process.stdin.resume();

```

- Now, if we call an undefined fuction:

### ./index.js

```diff
process.stdin.resume();
+ console.dog();

```

- Press `F5` key to run app:

![throw exception](../../99%20Resources/00%20Intro/04%20Process/throw%20exception.png)

![exit after exception](../../99%20Resources/00%20Intro/04%20Process/exit%20after%20exception.png)

- As expected, it throws an exception and the process exit.

- As we said before, we could access to `exit` event handler and do some operation before process exit.

> NOTE: It's only available perform `synchronous` operations. All `async` or `event loop` operations will be ignored inside `exit` event handler.

### ./index.js

```diff
+ process.on('exit', (code) => {
+   console.log(`About to exit with code: ${code}`);
+ });

process.stdin.resume();
console.dog();

```

- Press `F5` key to run app:

![exit handler](../../99%20Resources/00%20Intro/04%20Process/exit%20handler.png)

- Now, we could implement `uncaughtException` to log the error. This event is emitted whenever a JavaScript exception it's not handle and it bubbles all the way to the event loop:

### ./index.js

```diff
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});

+ process.on('uncaughtException', (err) => {
+   console.log(err);
+ });

process.stdin.resume();
console.dog();

```

- Press `F5` key to run app:

![log exception no exit](../../99%20Resources/00%20Intro/04%20Process/log%20exception%20no%20exit.png)

- This time, the exception was thrown but the process still running. This is a bad idea because the app could has an unpredictable state, so the best is to force manually exit the process:

### ./index.js

```diff
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});

process.on('uncaughtException', (err) => {
  console.log(err);
+ process.exit(1);
});

process.stdin.resume();
console.dog();

```

- Press `F5` key to run app:

![log exception exit](../../99%20Resources/00%20Intro/04%20Process/log%20exception%20exit.png)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
