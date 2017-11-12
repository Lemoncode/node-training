# 03 Routes

In this sample we are going to learn how create an http server and manage different routes.

Summary steps:

- Create basic server.
- Define `home` route.
- Add `router handler`.
- Create `redirect` route.
- Create `api` route to work with `JSON`.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _02 Http Client_ as starting point.

# Steps

- Remove previous `index.js` sample code.

### ./index.js

```diff
- const http = require('http');

- const req = http.request({ hostname: 'www.lemoncode.com' }, (res) => {
-   console.log(`Response status code: ${res.statusCode}`);
-   console.log(res.headers);

-   res.on('data', (data) => {
-     console.log(data.toString());
-   });
- });

- req.on('error', (error) => console.log(error));

- console.log(req.agent);

- req.end();

```

- As we know, we will create a basic server as other samples:

### ./index.js

```diff
+ const server = require('http').createServer();

+ server.on('request', (req, res) => {
+   res.writeHead(200, { 'Content-Type': 'text/plain' });
+   res.end('Hello world\n');
+ });

+ server.listen(3000);

```

- Run `server`:

```bash
node index
```

```bash
curl -i localhost:3000
```

- First step is create an `html` page to response when client make a request to `localhost:3000/home`:

### ./home.html

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  HOME
</body>
</html>

```

- Next step, we could define the `home` route:

### ./index.js

```diff
const server = require('http').createServer();
+ const fs = require('fs');

+ const routes = {
+   '/home': (res, fs) => {
+     res.writeHead(200, { 'Content-Type': 'text/html' });
+     res.end(fs.readFileSync('./home.html'));
+   },
+ };

+ const notFoundResponse = (res) => {
+   res.writeHead(404);
+   res.end();
+ };

+ const routeHandler = (route) => (
+   !!routes[route] ?
+   routes[route]:
+   notFoundResponse
+ );

server.on('request', (req, res) => {
- res.writeHead(200, { 'Content-Type': 'text/plain' });
- res.end('Hello world\n');
+ const route = routeHandler(req.url);
+ route(res, fs);
});

server.listen(3000);

```

![home route](../../99%20Resources/04%20Web/03%20Routes/home%20route.gif)

- As we see, we have created a `not found response`, but if we want to redirect the client from `localhost:3000/` to `localhost:3000/home`:

### ./index.js

```diff
const server = require('http').createServer();
const fs = require('fs');

const routes = {
  '/home': (res, fs) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync('./home.html'));
  },
+ '/': (res) => {
+   // NOTE: 301 indicates permanent move to location route set in header.
+   res.writeHead(301, { 'Location': '/home' });
+   res.end();
+ },
};

...

```

![redirect route](../../99%20Resources/04%20Web/03%20Routes/redirect%20route.gif)

- The client side is the responsible to create a new request to `home` route.

- If we want to work with JSON data, we have to change the `Content-Type` header:

### ./index.js

```diff
const server = require('http').createServer();
const fs = require('fs');

const routes = {
  '/home': (res, fs) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync('./home.html'));
  },

  '/': (res) => {
    // NOTE: 301 indicates permanent move to location route set in header.
    res.writeHead(301, { 'Location': '/home' });
    res.end();
  },

+ '/api': (res) => {
+   res.writeHead(200, { 'Content-Type': 'application/json' });
+   const data = { company: 'Lemoncode' };
+   res.end(JSON.stringify(data));
+ },
};

...

```

![api route](../../99%20Resources/04%20Web/03%20Routes/api%20route.gif)

- To see all Http `status code`:

```bash
node
```

```bash
http.STATUS_CODES
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
