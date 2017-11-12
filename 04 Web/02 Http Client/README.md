# 02 Http Client

In this sample we are going to

Summary steps:

-

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

-

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
