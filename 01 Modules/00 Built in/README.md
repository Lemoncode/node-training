# 00 Built in

In this sample we are going to learn how to require Node `built-in` modules. As example we are going to use `os` module.

Summary steps:

-

# Steps to build it

## Prerequisites

- In order to follow this step guides you will also need to take sample _02 Callback_ as starting point.

# Steps

- Remove previous sample code.

### ./index.js

```diff
- const maxTime = 2000;

- const oneWordToUpper = (value, callback) => {
-   const time = Math.floor((Math.random() * maxTime) + 1);
-   let error = null;
-   let result = null;
-   setTimeout(() => {
-     const splitted = value.split(' ');
-     console.log(splitted);
-     if (splitted.length > 1) {
-       error = { message: 'More than one word!' };
-     } else {
-       result = value.toUpperCase();
-       error = null;
-     }

-     callback(error, result, time);
-   }, time);
- };

- const handleResults = (error, result, time) => {
-   if (!!error) {
-     console.log(`Error: ${error.message}`);
-   } else {
-     console.log(`The word in upper: ${result}, the elapsed time: ${time} ms`);
-   }
- };

- const values = ['jaime', 'nasdan', 'daniel sanchez', 'jaime salas'];

- values.forEach(
-   (value) => oneWordToUpper(value, handleResults)
- );

```

-

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
