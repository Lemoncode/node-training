const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'old');
const { resolveFilePath, convertToUnixEpoch, convertToLocalDate } = require('./helpers');
const pathResolver = resolveFilePath(dirname);

if (!fs.existsSync(dirname)) {
  fs.mkdirSync(dirname);
}

const writeFilePromise = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject(err);
      }
      resolve('success');
    });
  });
};

const changeTimestampPromise = (filepath, time) => {
  return new Promise((resolve, reject) => {
    fs.utimes(filepath, time, time, (err) => {
      if (err) {
        reject(err);
      }
      resolve('success');
    });
  });
};

const iterations = new Array(10).fill(null);

iterations.forEach((value, index) => {
  const filePath = pathResolver(`files${index}`);
  const unixEpoch = convertToUnixEpoch(index);
  const time = convertToLocalDate(unixEpoch).toLocaleString();
  writeFilePromise(filePath, time)
    .then((result) => {
      console.log(index);
      return changeTimestampPromise(filePath, unixEpoch);
    })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
});
