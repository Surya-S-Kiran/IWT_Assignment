const http = require('http');
const url = require('url');

// Create a server
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/age') {
    // Parse date of birth from query parameters
    const dob = new Date(query.dob);
    const ageInMs = Date.now() - dob.getTime();
    const ageInYears = new Date(ageInMs).getFullYear() - 1970;

    // Render age in HTML response
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Your age is ${ageInYears} years old</h1>`);
    res.end();
  } else {
    // Render form in HTML response
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <form method="get" action="/age">
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob">
        <button type="submit">Submit</button>
      </form>
    `);
    res.end();
  }
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

