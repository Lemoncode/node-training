# 04 Task list

In this sample we are going to .

Summary steps:

-

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _03 Sync to async class_ as starting point.

# Steps

- Delete `async.js` file and remove previous `index.js` sample code.

### ./index.js

```diff
- const EventEmitter = require('events');

- class WithLog extends EventEmitter {
-   execute(asyncFunc) {
-     asyncFunc();
-     console.log('Before');
-     this.emit('begin');
-     this.emit('end');
-     console.log('after');
-   }
- }

- const withLog = new WithLog();

- withLog.on('begin', () => console.log('begin'));
- withLog.on('end', () => console.log('end'));

- withLog.execute(() => {
-   setTimeout(() => console.log('executing'),
-     500);
- });

```

-

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
