const fs = require('fs');

const readFileAsArray = (file, cb = () => { }) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
        return cb(error);
      };

      const lines = data.toString().trim().split('\n');
      resolve(lines);
      cb(null, lines);
    });
  });
};

const countOddCallback = (file) => {
  readFileAsArray(file, (err, lines) => {
    if (err) {
      throw err
    };
    const numbers = lines.map(Number);
    const oddNumber = numbers.filter(number => number % 2 === 1);
    console.log(`odd numbers count: ${oddNumber.length}`);
  });
};

const countOddPromises = (file) => {
  readFileAsArray(file)
    .then((lines) => {
      const numbers = lines.map(Number);
      const oddNumber = numbers.filter(number => number % 2 === 1);
      console.log(`odd numbers count: ${oddNumber.length}`);
    })
    .catch(console.error);
};

const countOddAsync = async (file) => {
  try {
    const lines = await readFileAsArray(file);
    const numbers = lines.map(Number);
    const oddNumber = numbers.filter(number => number % 2 === 1);
    console.log(`odd numbers count: ${oddNumber.length}`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  countOddCallback,
  countOddPromises,
  countOddAsync,
}
