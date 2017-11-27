const db = require('./database/db');
const url = 'mongodb://localhost:27017/test';

const findBy = (find, limit = 1, explain = false) => {
  db.connect(url)
    .then((db) => {
      const cursor = db.collection('restaurants')
        .find(find)
        .limit(limit);

      if (explain) {
        cursor.explain()
          .then((data) => {
            console.log(data);
            db.close();
          });
      }

      cursor.each((error, data) => {
        if (error) {
          throw error;
        }
        console.dir(data);
      });

      db.close();
    })
    .catch((error) => {
      console.error(error);
      db.close();
    });
};

findBy({ $or: [{ "cuisine": "Italian" }, { "address.zipcode": "10075" }] });
