# 05 Buffer

In this sample we are going to learn about `Buffer`. We will create three samples managing buffers.

Summary steps:

- Create a zero-filled buffer.
- Create an uninitialized buffer.
- Create a buffer from string.
- Using `String Decoder`.
- Using `fs` to and `Buffer.slice`.

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

- When converting streams of binary data, we should use the [`string_decoder`](https://nodejs.org/docs/latest-v6.x/api/string_decoder.html) module, because it handles multi-byte characters much better, specially incomplete multibyte characters. The string decoder preserves the incomplete encoded characters until it's complete and then returns it. The default toString operation on a buffer does not do that.

- As sample, we are going to create a new file named `stringDecoder.js`:

### ./stringDecoder.js

```javascript
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

```

- The `€` symbol typed in hexadecimal `UTF-8` is `[0xE2, 0x82, 0xAC]`:

### ./stringDecoder.js

```diff
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

+ const buffer = Buffer.from([0xE2, 0x82, 0xAC]);
+ console.log(buffer.toString());

```

- Press `F5` key to run app:

![euro symbol](../../99%20Resources/00%20Intro/05%20Buffer/euro%20symbol.png)

- Now, imagine that binary input is coming from somewhere and we want to encode it into UTF-8:

### ./stringDecoder.js

```diff
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

- const buffer = Buffer.from([0xE2, 0x82, 0xAC]);
- console.log(buffer.toString());
+ process.stdin.on('readable', () => {
+   const chunk = process.stdin.read();
+   if (chunk) {
+     const buffer = Buffer.from([chunk]);
+     console.log('With .toString():', buffer.toString());
+     console.log('With StringDecoder:', decoder.write(buffer));
+   }
+ });

```

- Run app using `node <filename>` because debugger console does not work well with input data:

```bash
node stringDecoder
```

![stringDecoder](../../99%20Resources/00%20Intro/05%20Buffer/stringDecoder.png)

- These are held in the buffer until the next call to stringDecoder.write() or until stringDecoder.end() is called.

- Now, we want to process a file using [`File system`](https://nodejs.org/docs/latest-v6.x/api/fs.html) module and convert the last three bytes of the file according to the map:

### ./bufferSlice.js

```javascript
const fs = require('fs');

const conversionMap = {
  '88': '65',
  '89': '66',
  '90': '67',
};

```

- Now, we are going to read `buffSlice.js` file and get the tag `XYZ` and use the `conversionMap` to change it:

### ./bufferSlice.js

```diff
const fs = require('fs');

const conversionMap = {
  '88': '65',
  '89': '66',
  '90': '67',
};

+ fs.readFile(__filename, (err, buffer) => {
+   let tags = buffer.slice(-5, -1);
+   tags.forEach(
+     (value, index) => tags[index] = conversionMap[value]
+   );
+   console.log(buffer.toString());
+ });

+ // TAG: XYZ

```

- Press `F5` key to run app:

![buffer slice](../../99%20Resources/00%20Intro/05%20Buffer/buffer%20slice.png)

- Although `buffer.slice` returns a new `Buffer`, if we modify the new instance, the original will be modified too because the allocated memory of the two objects overlap.


# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
