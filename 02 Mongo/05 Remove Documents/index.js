const db = require('./database/db');
const { URL, COLLECTION } = require('./database/settings');
const inquirer = require('./database/inquirer');
const { printDeleteResult } = require('./database/printer');
const { deleteOne, deleteMany } = require('./deleteQueries');

const dbPromise = db.connect(URL);

printDeleteResult(
  { "borough": "Manhattan" },
  deleteMany(dbPromise, COLLECTION),
)
  .then(() => {
    db.close();
  })
  .catch((error) => {
    console.log(error);
    db.close();
  });
