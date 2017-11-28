# Node training

In this training we will see the advantages developing with Node. We will also introduce the Document-oriented databases using Mongo / Mongoose.
Each sample contains a `README.md` file that indicates the purpose of the sample plus a step by step guide to reproduce it.

# Samples

# 01 Node

## 00 Intro

### 00 Installing Node and IDE

In this sample we are going to install and configure Node.js and VS Code.

### 01 Hello

In this sample we are going to create a `hello.js` file with `console.log` message and a VS Code `launch.json` file to run our first Node server.

### 02 Basic Server

In this sample we are going to create a simple NodeJS server that listen on port `3000`.

### 03 Callback

In this sample we are going to learn how to keep clean our code using callbacks.

### 04 Process

In this sample we are going to use the global object `process` and playing with the `exit` and `uncaughtException` events.

### 05 Buffer

In this sample we are going to learn about `Buffer`. We will create three samples managing buffers.

### 06 JSON Addons

In this sample we are going to play with `Node.js` addons.

## 01 Modules

### 00 Built in

In this sample we are going to learn how to require Node `built-in` modules. As example we are going to use `os` module and show some methods like `hostname`, `loadavg` and `freemem`.

### 01 File module

In this sample we are going to learn how to create a custom module and export it to be used in other file using `CommonJS modules`.

### 02 NPM modules

In this sample we are going to learn how to create and configure a `package.json` file, install a npm third library and use it.

## 02 Concurrency Model and Event Loop

### 00 Slow Operation

In this sample we are going to demonstrate how to get a blocking code.

### 01 SetImmediate

In this sample we are going to learn about `setImmediate` vs `setTimeout` methods.

### 02 NextTick

In this sample we are going to learn how to use `nextTick` method.

## 03 Events

### 00 Handling Async Code

In this sample we are going to working with async code using `callbacks`, `Promises` and `async/await`.

### 01 Events

In this sample we are going to create a basic sample to work with Node.js `Events`.

### 02 External emitter

In this sample we are going to use previous sample, require it from other file and create different instances of `EventEmitter`.

### 03 Sync to async class

In this sample we are going to learn how to migrate sync function using `events` to `async` code.

### 04 Task list

In this sample we are going to create two `EventEmitter`s instances splitted in two files and one unique `node process`. That is, each `EventEmitter` has its own file. So, we'll have the `client` and `server` files.

We need a comunication between `client` and `server`. To simplify it, the `server` receives a `client` instance like:

### ./client.js

```javascript
const client = new EventEmitter();
const server = require('./server')(client);
```

### ./server.js

```javascript
class Server extends EventEmitter {
  constructor(client) {
  }
  ...
}
...
module.exports = (client) => new Server(client);
```

The aim of this sample is implement a `Task list` where the `server` are listening each `command` (event) `emitted` by client.
The commands are:
  - `add`: Add a task to the list.
  - `delete`: Remove a task from the list.
  - `ls`: Show all tasks in the list.
  - `help`: Give info about commands.

> NOTE: if `client` emits other commands different than previous one, it responses with `Unknown` message.

The workflow could be:

- The `client` emit `commands` that user writes in the terminal/console. `Server` is listening that `commands`.
- The `server` emit a `response` for each command. `Client` is listening that `response`.

## 04 Web

### 00 Http Server

In this sample we are going to create a basic server using `server.on('request')` and see info about `HTTP` server response.

### 01 Http Server Stream

In this sample we are going to learn the differences between `res.write` and `res.end`.

### 02 Http Client

In this sample we are going to learn how to make HTTP request from Node.

### 03 Routes

In this sample we are going to learn how create an http server and manage different routes.

## 05 Built-in Libraries

### 00 OS

In this sample we are going to see some `os` module methods.

### 01 FS Delete

In this sample we are going to create an app for delete files older than 7 days.

### 02 FS Truncate

In this sample we are going to create an app for truncate a corrupted file with duplicated code.

### 03 FS Watch

In this sample we are going to implement `app` to watch files in specific folder.

## 06 Streams

### 00 Intro Readable Stream

In this sample we are going to send an http `request` to understand a `readable stream`.

### 01 Reading Big Files

In this sample we are going to learn how to improve performance reading big files using `pipes`.

### 02 Readable Stream

In this sample we are going to play with `Readable` class from `stream` module.

### 03 Writable Stream

In this sample we are going to play with `Writable` class from `stream` module.

### 04 Duplex

In this sample we are going to play with `Duplex` class from `stream` module.

### 05 Transform

In this sample we are going to play with `Transform` class from `stream` module.

### 06 Zip

In this sample we are going to use the `zlib` module to crompress a file and using `streams` and `pipes`.

# 02 Mongo

## 00 Intro

### 00 Installing Mongo

In this sample we are going to install and configure MongoDB.

### 01 Connect MongoClient

In this sample we are going to install `mongodb` via `npm` and use it to create a connection with a database.

## 01 Create Database

In this sample we are going to create a new `database` and `collection` and connect to it.

## 02 Insert

In this sample we are going to insert new `user` in `users` collection.

## 03 Query Documents

In this sample we are going to reuse the `db` object and create `queries` to `find` documents.

## 04 Update Documents

In this sample we are going to implement some `database` business and create `queries` to `update` documents.

## 05 Remove Documents

In this sample we are going to implement some `database` business and create `queries` to `remove` documents.

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
