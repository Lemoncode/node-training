# 03 Routes

In this sample we are going to

Summary steps:

-

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

-

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
