# 02 Callback

In this sample we are going to learn how to keep clean our code using callbacks.

Summary steps:

- Remove previous sample code.
- Create `oneWordToUpper` method.
- Use `oneWordToUpper` method.
- Use callbacks to keep clean our code.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _01 Basic server_ as starting point.

# Steps

- Remove previous sample code.

### ./index.js

```diff
- const http = require('http');

- const app = http.createServer((req, res) => {
-   res.writeHead(200, { 'Content-Type': 'text/plain' });
-   res.end('Hello World\n');
- });

- const port = 3000;
- app.listen(port);

- console.log(`Server running on port ${port}`);

```

- Create `oneWordToUpper`:

### ./index.js

```diff
+ const maxTime = 2000;

+ const oneWordToUpper = (value) => {
+   const time = Math.floor((Math.random() * maxTime) + 1);
+   let error = null;
+   let result = null;
+   setTimeout(() => {
+     const splitted = value.split(' ');
+     console.log(splitted);
+     if (splitted.length > 1) {
+       error = { message: 'More than one word!' };
+     } else {
+       result = value.toUpperCase();
+       error = null;
+     }

+     if (!!error) {
+       console.log(`Error: ${error.message}`);
+     } else {
+       console.log(`The word in upper: ${result}, the elapsed time: ${time} ms`);
+     }
+   }, time);
+ };

```

- Use `oneWordToUpper` method:

### ./index.js

```diff
const maxTime = 2000;

const oneWordToUpper = (value) => {
  const time = Math.floor((Math.random() * maxTime) + 1);
  let error = null;
  let result = null;
  setTimeout(() => {
    const splitted = value.split(' ');
    console.log(splitted);
    if (splitted.length > 1) {
      error = { message: 'More than one word!' };
    } else {
      result = value.toUpperCase();
      error = null;
    }

    if (!!error) {
      console.log(`Error: ${error.message}`);
    } else {
      console.log(`The word in upper: ${result}, the elapsed time: ${time} ms`);
    }
  }, time);
};

+ const values = ['jaime', 'nasdan', 'daniel sanchez', 'jaime salas'];

+ values.forEach(
+   (value) => oneWordToUpper(value)
+ );

```

- Press `F5` key to run app:

![run app without callbacks](../../99%20Resources/00%20Intro/02%20Callback/run%20app%20without%20callbacks.png)

- Use callbacks to keep clean our code. First, we could extract result handling and pass it as parameter:

### ./index.js

```diff
const maxTime = 2000;

- const oneWordToUpper = (value) => {
+ const oneWordToUpper = (value, callback) => {
  const time = Math.floor((Math.random() * maxTime) + 1);
  let error = null;
  let result = null;
  setTimeout(() => {
    const splitted = value.split(' ');
    console.log(splitted);
    if (splitted.length > 1) {
      error = { message: 'More than one word!' };
    } else {
      result = value.toUpperCase();
      error = null;
    }

-   if (!!error) {
-     console.log(`Error: ${error.message}`);
-   } else {
-     console.log(`The word in upper: ${result}, the elapsed time: ${time} ms`);
-   }
+   callback(error, result, time);
  }, time);
};

const values = ['jaime', 'nasdan', 'daniel sanchez', 'jaime salas'];

values.forEach(
- (value) => oneWordToUpper(value)
+ (value) => oneWordToUpper(value, (error, result, time) => {
+   if (!!error) {
+     console.log(`Error: ${error.message}`);
+   } else {
+     console.log(`The word in upper: ${result}, the elapsed time: ${time} ms`);
+   }
+ })
);

```

- Passing result handler as callback, we could re-use `oneWordToUpper` method with other `behaviour`. As one step over, we could extract callback into a function:

### ./index.js

```diff
const maxTime = 2000;

const oneWordToUpper = (value, callback) => {
  const time = Math.floor((Math.random() * maxTime) + 1);
  let error = null;
  let result = null;
  setTimeout(() => {
    const splitted = value.split(' ');
    console.log(splitted);
    if (splitted.length > 1) {
      error = { message: 'More than one word!' };
    } else {
      result = value.toUpperCase();
      error = null;
    }

    callback(error, result, time);
  }, time);
};

+ const handleResults = (error, result, time) => {
+   if (!!error) {
+     console.log(`Error: ${error.message}`);
+   } else {
+     console.log(`The word in upper: ${result}, the elapsed time: ${time} ms`);
+   }
+ };

const values = ['jaime', 'nasdan', 'daniel sanchez', 'jaime salas'];

values.forEach(
- (value) => oneWordToUpper(value, (error, result, time) => {
-   if (!!error) {
-     console.log(`Error: ${error.message}`);
-   } else {
-     console.log(`The word in upper: ${result}, the elapsed time: ${time} ms`);
-   }
- })
+ (value) => oneWordToUpper(value, handleResults)
);

```

- Press `F5` key to run app:

![run app with callbacks](../../99%20Resources/00%20Intro/02%20Callback/run%20app%20with%20callbacks.png)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
