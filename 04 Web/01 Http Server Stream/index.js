const server = require('http').createServer();

server.on('request', (req, res) => {
  res.writeHead(200, { 'Conent-Type': 'text/plain' });
  res.write('Hello World\n');

  setTimeout(() => {
    res.write('Another Hello World\n');
  }, 1000);

  setTimeout(() => {
    res.end('...Another Hello World\n');
  }, 2000);
});

server.listen(3000);
console.log('Server running on port 3000');
