const fs = require('fs');
const path = require('path');
const { logger, getFiles } = require('./helpers');
const dirname = path.join(__dirname, 'watch');

const isAddOrDeleteOperation = (event) => event === 'rename';

const currentFiles = getFiles(dirname);
const resolveFileIndex = (filename) => currentFiles.indexOf(filename);

const isDeleteOperation = (index) => (index >= 0);

const deleteHandler = (filename, index) => {
  currentFiles.splice(index, 1);
  logger(`${filename} removed`);
};

const addHandler = (filename) => {
  currentFiles.push(filename);
  logger(`${filename} added`);
};

const modifyHandler = (filename) => logger(`${filename} modified`);

const filesWatcher = fs.watch(dirname);
filesWatcher.on('change', (event, filename) => {
  logger(`Event: ${event}, File name: ${filename}`);
  if (isAddOrDeleteOperation(event)) {
    const index = resolveFileIndex(filename);
    (isDeleteOperation(index)) ?
      deleteHandler(filename, index) :
      addHandler(filename);
  } else {
    modifyHandler(filename);
  }
});

filesWatcher.on('error', (err) => logger(err));
