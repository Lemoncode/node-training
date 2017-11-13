# 02 Http Client

In this sample we are going to learn how to make HTTP request from Node.

Summary steps:

- Make Http request using the `http` module.
- Use the `request.on('error')` event handler.
- Use the `response.on('data')` event handler.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _01 Http Server Stream_ as starting point.

# Steps

- Remove previous `index.js` sample code.

### ./index.js

```diff
- const server = require('http').createServer();

- server.on('request', (req, res) => {
-   res.writeHead(200, { 'Conent-Type': 'text/plain' });
-   res.write('Hello World\n');

-   setTimeout(() => {
-     res.write('Another Hello World\n');
-   }, 1000);

-   setTimeout(() => {
-     res.end('...Another Hello World\n');
-   }, 2000);
- });

- server.listen(3000);
- console.log('Server running on port 3000');

```

- To make Http requests we could use the `http` module. As default, we are using the `GET` method, but we could make other one:

### ./index.js

```diff
+ const http = require('http');

+ const req = http.request({ hostname: 'www.lemoncode.com'}, (res) => {
+   console.log(res);
+ });

+ req.end();

```

- Notice that the handler has no error argument. It's because this handler gets registered as event listener and we also handle the error with an event handler. So this `http.request` returns an object which it's an event emitter:

### ./index.js

```diff
const http = require('http');

const req = http.request({ hostname: 'www.lemoncode.com'}, (res) => {
- console.log(res);
});

+ req.on('error', (error) => console.log(error));

+ console.log(req.agent);

req.end();

```

- The `response` is an event emitter too. So we could access for example to `data` event when it receives data from the hostname. This data event gives us a callback and the argment is a buffer:

### ./index.js

```diff
const http = require('http');

const req = http.request({ hostname: 'www.lemoncode.com'}, (res) => {
+ console.log(`Response status code: ${res.statusCode}`);
+ console.log(res.headers);

+ res.on('data', (data) => {
+   console.log(data.toString());
+ });
});

req.on('error', (error) => console.log(error));

console.log(req.agent);

req.end();

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
