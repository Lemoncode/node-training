const maxTime = 2000;

const oneWordToUpper = (value, callback) => {
  const time = Math.floor((Math.random() * maxTime) + 1);
  let error = null;
  let result = null;
  setTimeout(() => {
    const splitted = value.split(' ');
    console.log(splitted);
    if (splitted.length > 1) {
      error = { message: 'More than one word!' };
    } else {
      result = value.toUpperCase();
      error = null;
    }

    callback(error, result, time);
  }, time);
};

const handleResults = (error, result, time) => {
  if (!!error) {
    console.log(`Error: ${error.message}`);
  } else {
    console.log(`The word in upper: ${result}, the elapsed time: ${time} ms`);
  }
};

const values = ['jaime', 'nasdan', 'daniel sanchez', 'jaime salas'];

values.forEach(
  (value) => oneWordToUpper(value, handleResults)
);
