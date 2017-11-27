exports.deleteOne = (dbPromise, collection) => (findQuery) => {
  return new Promise((resolve, reject) => {
    dbPromise.then((db) => {
      const result = db.collection(collection).deleteOne(findQuery);
      resolve(result);
    })
    .catch((error) => reject(error));
  });
};

exports.deleteMany = (dbPromise, collection) => (findQuery) => {
  return new Promise((resolve, reject) => {
    dbPromise.then((db) => {
      const result = db.collection(collection).deleteMany(findQuery);
      resolve(result);
    })
    .catch((error) => reject(error));
  });
};
