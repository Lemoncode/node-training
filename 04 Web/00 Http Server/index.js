const server = require('http').createServer();

server.on('request', (req, res) => {
  res.writeHead(200, { 'Conent-Type': 'text/plain' });
  res.end('Hello World\n');
});

server.listen(3000);
console.log('Server running on port 3000');
