const http = require('http');

const req = http.request({ hostname: 'www.lemoncode.com' }, (res) => {
  console.log(`Response status code: ${res.statusCode}`);
  console.log(res.headers);

  res.on('data', (data) => {
    console.log(data.toString());
  });
});

req.on('error', (error) => console.log(error));

console.log(req.agent);

req.end();
