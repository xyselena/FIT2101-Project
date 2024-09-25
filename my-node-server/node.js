// Import the http module
const http = require('http');

// Create a server
const server = http.createServer((req, res) => {
    // Set the response header
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // Send a response
    res.end('Hello, World!\n');
});

// Define the port
const PORT = 3000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
