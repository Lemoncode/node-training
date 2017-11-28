const inquirer = {
  db: null,
  collection: null,
  isInitialized: false,
};

const initialize = (db, collection) => {
  if (!!db) {
    inquirer.db = db;
  } else {
    throw 'db not initialized';
  }

  if (!!collection) {
    inquirer.collection = collection;
  } else {
    throw 'Collection not initialized';
  }

  inquirer.isInitialized = true;
};

const findWithLimit = (query, limit = 1) => {
  if (inquirer.isInitialized) {
    return inquirer.db.collection(inquirer.collection)
      .find(query)
      .limit(limit);
  } else {
    throw 'Not initialized';
  }
};

module.exports = {
  initialize,
  findWithLimit
};
