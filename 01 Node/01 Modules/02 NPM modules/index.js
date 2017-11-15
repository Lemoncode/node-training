const request = require('request');

const responseHandler = (err, response, body) => {
  if (!err && response.statusCode === 200) {
    console.log(body);
  }
};

request(
  'http://www.leanmood.com',
  responseHandler
);
