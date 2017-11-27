const db = require('./database/db');
const { URL, COLLECTION } = require('./database/settings');
const inquirer = require('./database/inquirer');
const { printFindResult, printUpdateResult } = require('./database/printer');
const { updateOne } = require('./updateQueries');

const dbPromise = db.connect(URL);
dbPromise.then((db) => {
  inquirer.initialize(db, COLLECTION);
});

const updateBy = printUpdateResult(printFindResult, inquirer.findWithLimit);

updateBy(
  { "name": "Juni" },
  1,
  {
    $set: { "cuisine": "American (New)" },
    $currentDate: { "lastModified": true },
  },
  updateOne(dbPromise, COLLECTION),
)
  .then(() => {
    db.close();
  })
  .catch((error) => {
    console.log(error);
    db.close();
  });
