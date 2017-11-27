const db = require('./database/db');
const { URL, COLLECTION } = require('./database/settings');
const Inquirer = require('./database/inquirer');
const { printFindResult } = require('./database/printer');
const { updateOne } = require('./updateQueries');

const findBy = (query, limit = 1) => {
  db.connect(URL)
    .then((db) => {
      const inquirer = new Inquirer(db, COLLECTION);
      const cursor = inquirer.findWithLimit(query, limit);

      printFindResult(cursor);

      db.close();
    })
    .catch((error) => {
      console.error(error);
      db.close();
    });
};

findBy({ $or: [{ "cuisine": "Italian" }, { "address.zipcode": "10075" }] });
