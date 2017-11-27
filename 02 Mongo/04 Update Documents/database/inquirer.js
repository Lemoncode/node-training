module.exports = class Inquirer {
  constructor(db, collection) {
    if (!!db) {
      this.db = db;
    } else {
      throw 'db not initialized';
    }

    if (!!collection) {
      this.collection = collection;
    } else {
      throw 'collection not initialized';
    }
  }

  findWithLimit(query, limit = 1) {
    return this.db.collection(this.collection)
      .find(query)
      .limit(limit);
  }
}
