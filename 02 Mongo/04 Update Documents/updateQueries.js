const db = require('./database/db');
const { COLLECTION } = require('./database/settings');

exports.updateOne = (findQuery, setQuery) => {
  return new Promise((resolve, reject) => {
    const result = db.get().collection(collection).updateOne(findQuery, setQuery);
    resolve(result);
  });
}
