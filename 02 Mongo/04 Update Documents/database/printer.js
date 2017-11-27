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
