const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/chat';

const createUser = () => ({
  login: 'jaisal',
  privilege: 'standard',
  comments: [
    {
      date: new Date('2017-11-28T00:00:00Z'),
      text: 'I have something to do',
    },
    {
      date: new Date('2017-11-29T00:00:00Z'),
      text: 'I still not remind what to do...',
    },
  ],
});

const insertUser = (db, user) => (
  db.collection('users')
    .insertOne(user)
    .then(() => {
      console.log(`User ${user.login} inserted!`);
      db.close();
    })
    .catch((error) => { throw error })
);

MongoClient.connect(url)
  .then((db) => {
    const user = createUser();
    return insertUser(db, user);
  })
  .catch((error) => console.log(error));
