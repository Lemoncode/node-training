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
        resolve(get());
      })
      .catch((error) => reject(error));
  });
};

const get = exports.get = () => state.db;

exports.close = (done = () => { }) => {
  if (state.db) {
    state.db.close((error) => {
      state.db = null;
      done(error);
    });
  }
};
