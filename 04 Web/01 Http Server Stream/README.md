# 01 Http Server Stream

In this sample we are going to learn the differences between `res.write` and `res.end`.

Summary steps:

- Update previous sample using `res.write` instead `res.end`.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _00 Http Server_ as starting point.

# Steps

- As we see in previous sample Node send a `200` status Code and then send the message with `res.end`.

- After Node sends the 200 here, it could do many things before terminating the response. Instead of inefficiently buffering everything, it could  write in memory all responses and then write it at once, it just can stream parts of the response as they're ready.

- The browser knows that the content is done through the http protocol. `Http 1.1` knows when a message is finished and it's when we use the `res.end()` method.

### ./index.js

```diff
const server = require('http').createServer();

server.on('request', (req, res) => {
  res.writeHead(200, { 'Conent-Type': 'text/plain' });
- res.end('Hello World\n');
+ res.write('Hello World\n');
});

server.listen(3000);
console.log('Server running on port 3000');

```

- Run app `node index`:

```bash
curl -i localhost:3000

```

![using res write](../../99%20Resources/04%20Web/01%20Http%20Server%20Stream/using%20res%20write.gif)

- As we see, the response does not finish because Node is still streaming. We could send responses like:

### ./index.js

```diff
const server = require('http').createServer();

server.on('request', (req, res) => {
  res.writeHead(200, { 'Conent-Type': 'text/plain' });
  res.write('Hello World\n');

+  setTimeout(() => {
+    res.write('Another Hello World\n');
+  }, 1000);

+  setTimeout(() => {
+    res.write('...Another Hello World\n');
+  }, 2000);
});

server.listen(3000);
console.log('Server running on port 3000');

```

- Run app `node index`:

```bash
curl -i localhost:3000

```

![sending three responses](../../99%20Resources/04%20Web/01%20Http%20Server%20Stream/sending%20three%20responses.gif)

- It could handle other requests thanks to the event loop. Requests are being handled concurrently by the same node process.

- Finishing the response object with a `res.end` call is not optional, we have to do it for every request. If not the request will be end after the default timeout (2 mins):

### ./index.js

```diff
const server = require('http').createServer();

server.on('request', (req, res) => {
  res.writeHead(200, { 'Conent-Type': 'text/plain' });
  res.write('Hello World\n');

  setTimeout(() => {
    res.write('Another Hello World\n');
  }, 1000);

  setTimeout(() => {
-   res.write('...Another Hello World\n');
+   res.end('...Another Hello World\n');
  }, 2000);
});

server.listen(3000);
console.log('Server running on port 3000');

```

- Run app `node index`:

```bash
curl -i localhost:3000

```

![finishing responses](../../99%20Resources/04%20Web/01%20Http%20Server%20Stream/finishing%20response.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
