# 00 Slow Operation

In this sample we are going to .

Summary steps:

-

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _02 NPM modules_ as starting point.

# Steps

- Remove previous `index.js` sample code and delete `package.json`.

### ./index.js

```diff
- const request = require('request');

- const responseHandler = (err, response, body) => {
-   if (!err && response.statusCode === 200) {
-     console.log(body);
-   }
- };

- request(
-   'http://www.leanmood.com',
-   responseHandler
- );

```

-

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
