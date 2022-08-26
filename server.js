const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (req.url === '/product') {
    res.end(JSON.stringify({
      message: 'Product route'
    }))
  }

  if (req.url === '/user') {
    res.end(JSON.stringify({
      message: 'User route'
    }))
  }

  res.end(JSON.stringify({message: 'Other routes'}));
}).listen(4001, () => console.log('Server running at port 4001'));