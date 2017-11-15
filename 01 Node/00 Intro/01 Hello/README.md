# 01 Hello

In this sample we are going to create a `hello.js` file with `console.log` message and a VS Code `launch.json` file to run our first Node server.

Summary steps:

- Create VS Code `launch.json` file.
- Create `hello.js` file.
- Run server.

# Steps to build it

## Prerequisites

- Install [Node.js and npm](https://nodejs.org/en/) (v6.x or higher) if they are not already installed on your computer.

- Install [VS Code](https://code.visualstudio.com/)

# Steps

- Create VS Code `launch.json` file:

![create vs code launch file](../../99%20Resources/00%20Intro/01%20Hello/create%20vs%20code%20launch%20file.gif)

- Create `hello.js` file:

### ./hello.js

```javascript
const hello = 'Hello World!!';

setTimeout(() => console.log(hello), 1000);

```

- For run this file, we can use VS Code debugger like:

![run server](../../99%20Resources/00%20Intro/01%20Hello/run%20server.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
