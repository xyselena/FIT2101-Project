const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

// Function to serve files
const serveFile = (filePath, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Internal Server Error\n');
      return;
    }

    res.statusCode = 200;
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    // Set content type based on file extension
    switch (extname) {
      case '.html':
        contentType = 'text/html';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.js':
        contentType = 'text/javascript';
        break;
      default:
        contentType = 'application/octet-stream';
    }

    res.setHeader('Content-Type', contentType);
    res.end(data); // Send the content
  });
};

const server = http.createServer((req, res) => {
  // Routing based on URL
  let filePath = '';

  if (req.url === '/') {
    filePath = path.join(__dirname, 'public', 'create-sprint02.html'); // Serve the homepage
  } else if (req.url === '/style.css') {
    filePath = path.join(__dirname, 'public', 'style.css'); // Example CSS file
  } else if (req.url === '/script.js') {
    filePath = path.join(__dirname, 'public', 'script.js'); // Example JS file
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404 Not Found\n');
    return;
  }

  // Serve the requested file
  serveFile(filePath, res);
});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
