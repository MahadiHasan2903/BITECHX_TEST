// Import user schema
const users = require("../models/userModel");

// Get all users
exports.getAllUsers = (req, res) => {
  res.json(users);
};

// Get single user by userId
exports.getUserById = (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.json(user);
};

// Create a new user
exports.createUser = (req, res) => {
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
};

// Update an user
exports.updateUser = (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  user.username = username;
  user.password = password;

  res.json(user);
};

// Delete an user
exports.deleteUser = (req, res) => {
  const index = users.findIndex((user) => user.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("User not found");

  users.splice(index, 1);
  res.send("User deleted successfully");
};
