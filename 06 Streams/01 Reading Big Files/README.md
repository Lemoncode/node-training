# 01 Reading Big Files

In this sample we are going to learn how to improve performance reading big files using `pipes`.

Summary steps:

- Create process to generate a big file.
- Read file using `fs.readFile`.
- Read file using `fs.createReadStream` and `pipe`.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _00 Intro Readable Stream_ as starting point.

# Steps

- Delete `package.json` and remove previous `index.js` sample code.

- The fs module can be used to read from and write to files using a stream interface. The next process is going to generate a really bif file:

### ./createBigFile.js

```javascript
const fs = require('fs');

const file = fs.createWriteStream('./big.file');

for (let index = 0; index < 1e6; index++) {
  file.write(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac scelerisque massa, sit amet consectetur enim.
  Aenean sit amet justo arcu. Fusce porttitor ipsum erat, quis aliquam diam congue id. Mauris maximus iaculis velit a faucibus.
  Quisque cursus a mauris sit amet ullamcorper. Morbi malesuada nibh sem, sit amet porta mauris dignissim ac.
  Donec euismod vitae felis at rhoncus.`);
}

file.end();

```

- Run `node createBigFile` to create a file about ~372MB.

- Now, we could create a server to read that file using `fs.readFile`:

### ./index.js

```diff
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  fs.readFile('./big.file', (err, data) => {
    if (err) {
      throw err;
    }

    res.end(data);
  })
});

server.listen(4000);

```

- Now we are going to run `server` and see performance using `Task Manager on Windows` or `Activity Monitor on Mac`:

```bash
node index
```

![Before use fs.readFile](../../99%20Resources/06%20Streams/01%20Reading%20Big%20Files/Before%20use%20fs.readFile.png)

```bash
curl -i localhost:4000
```

![After use fs.readFile](../../99%20Resources/06%20Streams/01%20Reading%20Big%20Files/After%20use%20fs.readFile.png)

- As we see, when the file is requested, our process jump to over ~1GB of memory. That is because our code buffered the whole big file in memory before wrote out. Really bad :(

- Since this response is a writable stream, if we have the big file as a readable stream, we could simply `pipe` one into the other and it avoid filling up the memory.

### ./index.js

```diff
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
- fs.readFile('./big.file', (err, data) => {
-   if (err) {
-     throw err;
-   }

-   res.end(data);
- })
+ const src = fs.createReadStream('./big.file');
+ src.pipe(res);
});

server.listen(4000);

```

![Before use fs.createReadStream](../../99%20Resources/06%20Streams/01%20Reading%20Big%20Files/Before%20use%20fs.createReadStream.png)

![After use fs.createReadStream](../../99%20Resources/06%20Streams/01%20Reading%20Big%20Files/After%20use%20fs.createReadStream.png)

- The fs module can give a readable stream for any file using `createReadStream` method and then we simply `pipe` this readable stream into the response writable stream. Now the memory grows but about ~45MB.

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
