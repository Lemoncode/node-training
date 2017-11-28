exports.printFindResult = (cursor) => {
  cursor.each((error, data) => {
    if (error) {
      throw error;
    }
    console.dir(data);
  });
};

exports.printUpdateResult = (printCallback, findCallback) => (findQuery, limit, updateQuery, updater) => {
  return updater(findQuery, updateQuery)
    .then((result) => {
      const cursor = findCallback(findQuery, limit);
      printCallback(cursor);
    });
};

exports.printDeleteResult = (findQuery, deleteBy) => {
  return deleteBy(findQuery)
    .then((result) => {
      console.log(result);
    });
};
