const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());

// Sample hardcoded data for users
let users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
  { id: 3, username: "user3", password: "password3" },
  { id: 4, username: "user4", password: "password4" },
  { id: 5, username: "user5", password: "password5" },
];

//Testing server connection
app.get("/", (req, res) => {
  res.send("Hello world from backend server!");
});

// CRUD endpoints for users

//Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

//Get single user by userId
app.get("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});

//Create a new user
app.post("/create-user", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const newUser = {
    id: users.length + 1,
    username,
    password,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

//Update an user
app.put("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  user.username = username;
  user.password = password;

  res.json(user);
});

//Delete an user
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((user) => user.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("User not found");

  users.splice(index, 1);
  res.send("User deleted successfully");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
