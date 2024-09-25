const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1'; // Allow public access
const port = process.env.PORT || 4040; // Use the PORT environment variable

// Function to serve files
const serveFile = (filePath, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(`Error reading file: ${filePath}`, err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`Internal Server Error: ${err.message}\n`);
      return;
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html'; // Default to HTML

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
    res.statusCode = 200;
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  let filePath = '';

  // Determine the requested URL and set the file path accordingly
  switch (req.url) {
    case '/':
      filePath = path.join(__dirname, 'public', 'create-sprint02.html');
      break;
    case '/create-task-interface':
      filePath = path.join(__dirname, 'public', 'Create Task Interface.html');
      break;
    case '/drag-and-drop-ui':
      filePath = path.join(__dirname, 'public', 'Drag and drop UI.html');
      break;
    case '/edit-sprint':
      filePath = path.join(__dirname, 'public', 'Edit Sprint.html');
      break;
    case '/task-in-detail':
      filePath = path.join(__dirname, 'public', 'Task in Detail.html');
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404 Not Found\n');
      return;
  }

  console.log(`Requesting file: ${filePath}`);
  serveFile(filePath, res);
});

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
