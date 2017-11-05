const mathfun = require('./mathfun');

const processResult = (err, result, time) => {
  if (err) {
    console.log(`ERROR: ${err.message}`);
  } else {
    console.log(`The result is: ${result} (${time} ms)`);
  }
};

[5, 25, 4, 8, 64].forEach(
  (value) => mathfun.intSqrt(value, processResult)
);
