const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, (error, db) => {
  console.log('Success');
  db.close();
});
