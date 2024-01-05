import http from 'http';

const port = 3000;
const hostname = 'localhost';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Welcome to KodeCamp 30-Day Code Challenge!\n');
});

server.listen(port, hostname, () => {
  console.log(`Your Server is hosted at http://${hostname}:${port}`);
});
