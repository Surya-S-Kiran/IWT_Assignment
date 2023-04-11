const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// Middleware function to log all requests
const logRequests = (req, res, next) => {
  console.log(`Received ${req.method} Request on ${req.url}`)
  next()
}

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Use logRequests middleware for all requests
app.use(logRequests)

// Array to store users
const users = []

// Route for registration form
app.get('/register', (req, res) => {
  res.send(`
    <form method="POST" action="/register">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required><br>
      <label for="contact">Contact No.:</label>
      <input type="text" id="contact" name="contact" required><br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required><br>
      <label for="repeatPassword">Repeat Password:</label>
      <input type="password" id="repeatPassword" name="repeatPassword" required><br>
      <button type="submit">Register</button>
    </form>
  `)
})

// Route for handling registration form submission
app.post('/register', (req, res) => {
  const { name, email, contact, password, repeatPassword } = req.body

  // Check if password and repeat password match
  if (password !== repeatPassword) {
    return res.send('Error: Passwords do not match')
  }

  // Generate user ID based on first name
  const firstName = name.toLowerCase().split(' ')[0]
  let userNumber = 1

  // Check if user ID already exists, and increment userNumber if necessary
  while (users.some(user => user.userId === `${firstName}.${userNumber}`)) {
    userNumber++
  }

  // Add user to array
  const user = { userId: `${firstName}.${userNumber}`, name, email, contact, password }
  users.push(user)

  // Send welcome message with user ID
  res.send(`Welcome ${name}, your user ID is ${user.userId}`)
})

// Route for login form
app.get('/login', (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <label for="userId">User ID:</label>
      <input type="text" id="userId" name="userId" required><br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required><br>
      <button type="submit">Login</button>
    </form>
  `)
})

// Route for handling login form submission
app.post('/login', (req, res) => {
  const { userId, password } = req.body

  // Search for user with matching user ID and password
  const user = users.find(user => user.userId === userId && user.password === password)

  if (user) {
    // Render welcome message with user name
    res.send(`Welcome, ${user.name}`)
  } else {
    // Render invalid login message
    res.send('Invalid login')
  }
})

// Start server
app.listen(7898, () => {
  console.log('Server started on port 7898')
})

