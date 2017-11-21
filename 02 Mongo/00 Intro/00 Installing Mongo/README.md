# 00 Installing Mongo

In this sample we are going to install and configure MongoDB.

Summary steps:

- Install last recommended Mongo version.
- Set `Environment Variables` path.
- Create `data` folder.
- Run `mongod` and `mongo`.

# Steps to build it

# Steps

- To install MongoDB, we have to download from [mongodb.com](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47537327.909570938.1454600557#community) and select the `recommended` version. In this case, we are going to install `3.4.10 for Windows` (Windows Server 2008 R2 64-bit and later, with SLL support x64):

![download mongo](../../99%20Resources/00%20Intro/00%20Installing%20Mongo/download%20mongo.png)

- Install like next, next, complete, finish.

- Now, we should have Mongo installed in `C:\Program Files\MongoDB\Server\3.4\bin` path. Mongo does not set the `mongo`'s environment variables path by default, so we have to do it:

![00 Search environment variables](../../99%20Resources/00%20Intro/00%20Installing%20Mongo/00%20Search%20environment%20variables.png)

![01 Click on Environment Variables](../../99%20Resources/00%20Intro/00%20Installing%20Mongo/01%20Click%20on%20Environment%20Variables.png)

![02 Edit Path](../../99%20Resources/00%20Intro/00%20Installing%20Mongo/02%20Edit%20Path.png)

![03 Add new variable](../../99%20Resources/00%20Intro/00%20Installing%20Mongo/03%20Add%20new%20variable.png)

- Now we have to be able to write `mongo` in whatever `console/terminal`:

```bash
mongo --version
```

- MongoDB requires a `data directory` to store all data. By default, this directory paths is in `C:\data`. We need to create two `empty` folders:

    - `C:\data\db`
    - `C:\data\log`

> NOTE: For alternative path you could follow next [guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#set-up-the-mongodb-environment)

- Finally, each time we want to work with mongo, we have to run MongoDB Service using:

```bash
mongod
```

![run mongod](../../99%20Resources/00%20Intro/00%20Installing%20Mongo/run%20mongod.gif)

- The previous command starts the main MongoDB database process. It's `waiting for connections`.

- We could connect to this service using several ways. The most basic connection is using the `Mongo Shell`:

```bash
mongo
```

![run mongo](../../99%20Resources/00%20Intro/00%20Installing%20Mongo/run%20mongo.gif)

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
