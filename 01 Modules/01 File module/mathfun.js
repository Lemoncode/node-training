const maxTime = 2000;

const intSqrt = (value, callback) => {
  const waitTime = Math.floor(Math.random() * (maxTime + 1));
  const result = Math.sqrt(value);
  (!Number.isInteger(result)) ?
    callback(new Error('Not integer square')) :
    callback(null, result, waitTime);
};

module.exports.intSqrt = intSqrt;
