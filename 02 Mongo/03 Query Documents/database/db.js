const { MongoClient } = require('mongodb');

const state = {
  db: null,
};

exports.connect = (url) => {
  return new Promise((resolve, reject) => {
    if (state.db) {
      return resolve('Already connected');
    }

    MongoClient.connect(url)
      .then((db) => {
        state.db = db;
        resolve(state.db);
      })
      .catch((error) => reject(error));
  });
};

exports.close = (done = () => { }) => {
  if (state.db) {
    state.db.close((error) => {
      state.db = null;
      done(error);
    });
  }
};
