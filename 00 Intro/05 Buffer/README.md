# 05 Buffer

In this sample we are going to learn about `Buffer`. We will create three samples managing buffers.

Summary steps:

- Create a zero-filled buffer.
- Create an uninitialized buffer.
- Create a buffer from string.
- Using `string_decoder`.

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _04 Process_ as starting point.

# Steps

- Remove previous sample code.

### ./index.js

```diff
- process.on('exit', (code) => {
-   console.log(`About to exit with code: ${code}`);
- });

- process.on('uncaughtException', (err) => {
-   console.log(err);
-   process.exit(1);
- });

- process.stdin.resume();
- console.dog();

```

- [`Buffer`](https://nodejs.org/docs/latest-v6.x/api/buffer.html) _class was introduced as part of the Node.js API to make it possible to interact with_ binary data. This class was implemented before that ES6 introduced [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), so now, it _implements the Uint8Array API in a manner that is more optimized and suitable for Node.js' use cases._

- There are many ways to create a buffer, we could start creating a zero-filled buffer:

### ./index.js

```diff
+ const buffer = Buffer.alloc(8);
+ console.log(buffer);

```

- Press `F5` key to run app:

![zero-filled buffer](../../99%20Resources/00%20Intro/05%20Buffer/zero-filled%20buffer.png)

- Using `allocUnsafe` we are creating buffer faster than calling `alloc` but the returned instance might contain old data that needs to be overwritten using either fill() or write():

### ./index.js

```diff
const buffer = Buffer.alloc(8);
console.log(buffer);

+ const buffer2 = Buffer.allocUnsafe(8);
+ console.log(buffer2);

```

- Press `F5` key to run app:

![uninitialized buffer](../../99%20Resources/00%20Intro/05%20Buffer/uninitialized%20buffer.png)

- Fill the previous buffer:

### ./index.js

```diff
const buffer = Buffer.alloc(8);
console.log(buffer);

const buffer2 = Buffer.allocUnsafe(8);
console.log(buffer2);

+ buffer2.fill();
+ console.log(buffer2);

```

- Press `F5` key to run app:

![fill uninitialized buffer](../../99%20Resources/00%20Intro/05%20Buffer/fill%20uninitialized%20buffer.png)


- To understand the difference between buffered dadta and normal data, we are going to create a buffer from string using `Buffer.from`:

### ./index.js

```diff
const buffer = Buffer.alloc(8);
console.log(buffer);

const buffer2 = Buffer.allocUnsafe(8);
console.log(buffer2);

buffer2.fill();
console.log(buffer2);

+ const string = 'touché';
+ const buffer3 = Buffer.from(string);

```

- The string is typed using `UTF-8` and the default encoding of [`from(string[,encoding])`](https://nodejs.org/docs/latest-v6.x/api/buffer.html#buffer_class_method_buffer_from_string_encoding) is `UTF-8` too, so we could change it to `ascii` for example and see the differences:

### ./index.js

```diff
const buffer = Buffer.alloc(8);
console.log(buffer);

const buffer2 = Buffer.allocUnsafe(8);
console.log(buffer2);

buffer2.fill();
console.log(buffer2);

const string = 'touché';
- const buffer3 = Buffer.from(string);
+ const buffer3 = Buffer.from(string, 'ascii');

+ console.log(string, string.toString(), string.length);
+ console.log(buffer3, buffer3.toString(), string.length);

```

- Press `F5` key to run app:

![buffer from](../../99%20Resources/00%20Intro/05%20Buffer/buffer%20from.png)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
