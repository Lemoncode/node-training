# 00 Http Server

In this sample we are going to .

Summary steps:

- Create `index.js` file with `http` server.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _04 Task list_ as starting point.

# Steps

- Delete `client.js` and `server.js` files.

- As we see on `00 Intro module`, we are going to create a basic server:

### ./index.js

```javascript
const server = require('http').createServer();

```

- But this time, instead of pass a `callback` for each request to `createServer` method, we will use [`server.on`](https://nodejs.org/docs/latest-v6.x/api/http.html#http_class_http_server) method to access :

### ./index.js

```diff
const server = require('http').createServer();

+ server.on('request', (req, res) => {
+   res.writeHead(200, { 'Conent-Type': 'text/plain' });
+   res.end('Hello World\n');
+ });

+ server.listen(3000);
+ console.log('Server running on port 3000');

```

- Run app `node index`:

- Open `http://localhost:3000` in your browser:

![open server in browser](../../99%20Resources/04%20Web/00%20Http%20Server/open%20server%20in%20browser.png)

- When we run the script, Node will no exit, because it has a listener handler. And it will respond to any http request on port `3000`. If access to localhost:3000 with `curl`:

- Run app `node index`:

```bash
curl -i localhost:3000

```

![open server with terminal](../../99%20Resources/04%20Web/00%20Http%20Server/open%20server%20with%20terminal.gif)

> NOTE: with -i flag includes info about HTTP protocol.

- We get info about:

`Connection: keep-alive` -> means that the connection to the web server will be persisted. The tcp connection will not be killed  after a requester receives a response, so that they can send multiple requests on the same connection.

`Transfer-Encoding: chunked`-> is used to send a variable length response text. It basically means that the response is being streamed. Node is ok on sending partial chunked responses, because the response object is a writable stream. There is no response length value being sent.

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
