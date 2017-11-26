const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/chat';

MongoClient.connect(url)
  .then((db) => {
    db.createCollection('users')
      .then((res) => {
        console.log('Collection created');
        db.close();
      })
      .catch((error) => console.log(error));
  })
  .catch((error) => console.log(error));
