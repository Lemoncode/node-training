const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'files');
const { resolveFilePath, getFiles } = require('./helpers');

const resolveTruncateLength = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats.size / 2);
    });
  });
};

const truncateData = (length, filePath) => {
  return new Promise((resolve, reject) => {
    console.log(length);
    fs.truncate(filePath, length, (err) => {
      if (err) {
        reject(err);
      }
      resolve('success');
    });
  });
};

const processSingleFile = (filepath) => {
  resolveTruncateLength(filepath)
    .then((length) => truncateData(length, filepath))
    .catch(err => console.log(err));
};

const createProcessFiles = (files, pathResolver) => (processSingleFile) => {
  files.forEach((filename) => {
    const filepath = pathResolver(filename);
    processSingleFile(filepath);
  });
};

const pathResolver = resolveFilePath(dirname);
const files = getFiles(dirname);

const processFiles = createProcessFiles(files, pathResolver);
processFiles(processSingleFile);
