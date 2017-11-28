const db = require('./database/db');
const { URL, COLLECTION } = require('./database/settings');
const inquirer = require('./database/inquirer');
const { printFindResult, printUpdateResult } = require('./database/printer');
const { updateOne, updateMany } = require('./updateQueries');

const dbPromise = db.connect(URL);
dbPromise.then((db) => {
  inquirer.initialize(db, COLLECTION);
});

const updateBy = printUpdateResult(printFindResult, inquirer.findWithLimit);

updateBy(
  { "address.zipcode": "10016" },
  2,
  {
    $set: { cuisine: "Category To Be Determined" },
    $currentDate: { "lastModified": true },
  },
  updateMany(dbPromise, COLLECTION),
)
  .then(() => {
    db.close();
  })
  .catch((error) => {
    console.log(error);
    db.close();
  });
