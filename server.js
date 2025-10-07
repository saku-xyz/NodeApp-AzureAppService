const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Dummy data
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// Root route
app.get('/', (req, res) => {
  console.log(`[${new Date().toISOString()}] GET / - Root endpoint hit`);
  res.send('Welcome to Simple Node API!');
});

// Get all users
app.get('/users', (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /users - Returning all users`);
  res.json(users);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /users/${req.params.id} - Fetch user by ID`);
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    console.log(`[${new Date().toISOString()}] User ID ${req.params.id} not found`);
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// Create new user
app.post('/users', (req, res) => {
  console.log(`[${new Date().toISOString()}] POST /users - Creating new user`, req.body);
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  console.log(`[${new Date().toISOString()}] User created with ID ${newUser.id}`);
  res.status(201).json(newUser);
});

// Update user
app.put('/users/:id', (req, res) => {
  console.log(`[${new Date().toISOString()}] PUT /users/${req.params.id} - Updating user`, req.body);
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    console.log(`[${new Date().toISOString()}] User ID ${req.params.id} not found`);
    return res.status(404).json({ message: 'User not found.' });
  }

  const { name, email } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;

  console.log(`[${new Date().toISOString()}] User ID ${req.params.id} updated`);
  res.json(user);
});

// Delete user
app.delete('/users/:id', (req, res) => {
  console.log(`[${new Date().toISOString()}] DELETE /users/${req.params.id} - Deleting user`);
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    console.log(`[${new Date().toISOString()}] User ID ${req.params.id} not found`);
    return res.status(404).json({ message: 'User not found' });
  }

  const deletedUser = users.splice(index, 1);
  console.log(`[${new Date().toISOString()}] User ID ${req.params.id} deleted`);
  res.json(deletedUser[0]);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
