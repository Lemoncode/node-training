const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'old');
const { resolveFilePath, getFiles, getMillisecondsPerDay } = require('./helpers');
const pathResolver = resolveFilePath(dirname);

const resolveMtime = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats.mtime);
    });
  });
};

const hasToBeUnlink = (mtime) => {
  const millisecondsPerWeek = 7 * getMillisecondsPerDay()
  const olderThanAWeek = Date.now() - mtime.getTime() > millisecondsPerWeek;
  return olderThanAWeek;
};

const resolveUnlink = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(filePath);
    });
  });
};

const files = getFiles(dirname);

files.forEach((file) => {
  const filePath = pathResolver(file);
  resolveMtime(filePath)
    .then((result) => {
      if (hasToBeUnlink(result)) {
        return resolveUnlink(filePath);
      }
    })
    .then((file) => {
      if (file) {
        console.log(`The file has been deleted ${file}`)
      }
    })
    .catch((err) => console.log(err));
});
