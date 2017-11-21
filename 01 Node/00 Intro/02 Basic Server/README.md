# 01 Basic server

In this sample we are going to create a simple NodeJS server that listen on port `3000`.

Summary steps:

- Rename `hello.js` to `index.js`.
- Require `http` module.
- Create app server.
- Listen on port `3000`.
- Show `console.log` to ensure server is running.
- Run app server.
- Open `http://localhost:3000`.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _01 Hello_ as starting point.

# Steps

- Rename `hello.js` to `index.js` and remove all code:

### ./index.js

```diff
- const hello = 'Hello World!!';

- setTimeout(() => console.log(hello), 1000);

```

- Require `http` module:

### ./index.js

```diff
+ const http = require('http');

```

- Create app server:

### ./index.js

```diff
const http = require('http');

+ const app = http.createServer((req, res) => {
+   res.writeHead(200, { 'Content-Type': 'text/plain' });
+   res.end('Hello World\n');
+ });


```

- Listen on port `3000`:

### ./index.js

```diff
const http = require('http');

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

+ const port = 3000;
+ app.listen(port);


```

- Show `console.log` to ensure server is running:

### ./index.js

```diff
const http = require('http');

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

const port = 3000;
app.listen(port);

+ console.log(`Server running on port ${port}`);

```

- Run app server as we show on _01 Hello_ or press `F5` key.

- Open `http://localhost:3000` in your browser:

![open server in browser](../../99%20Resources/00%20Intro/02%20Basic%20Server/open%20server%20in%20browser.png)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
