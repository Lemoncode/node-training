# 01 Basic server

In this sample we are going to create a simple NodeJS server that listen on port `3000`

Summary steps:

- Rename `hello.js` to `index.js`.
- Require `http` module.
- Create app server.
- Listen on port `3000`.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _00 Hello_ as starting point.

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

+ 

```

- Listen on port `3000`:

### ./index.js

```diff
const http = require('http');

+ 

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us. 
