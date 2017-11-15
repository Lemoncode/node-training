const path = require('path');
const fs = require('fs');

exports.resolveFilePath = (dirname) => (file) => path.join(dirname, file);

exports.getFiles = (dirname) => fs.readdirSync(dirname);

const getMillisecondsPerDay = () => 24 * 60 * 60 * 1000;
exports.getMillisecondsPerDay = getMillisecondsPerDay;

exports.convertToUnixEpoch = (index) => (
  (Date.now() - index * getMillisecondsPerDay()) / 1000
);

exports.convertToLocalDate = (unixEpoch) => (
  new Date(unixEpoch * 1000)
);
