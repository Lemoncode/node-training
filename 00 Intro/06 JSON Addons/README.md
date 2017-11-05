# 06 JSON Addons

In this sample we are going to .

Summary steps:

-

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _05 Buffer_ as starting point.

# Steps

- Remove previous sample code and delete `bufferSlice.js` and `stringDecoder.js`:

### ./index.js

```diff
- const buffer = Buffer.alloc(8);
- console.log(buffer);

- const buffer2 = Buffer.allocUnsafe(8);
- console.log(buffer2);

- buffer2.fill();
- console.log(buffer2);

- const string = 'touché';
- const buffer3 = Buffer.from(string, 'ascii');

- console.log(string, string.toString(), string.length);
- console.log(buffer3, buffer3.toString(), string.length);

```

-


# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
