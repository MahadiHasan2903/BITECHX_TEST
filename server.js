const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Import user controller
const userController = require("./controllers/userController");

// Testing server connection
app.get("/", (req, res) => {
  res.send("Hello world from backend server!");
});

// CRUD endpoints for users
app.get("/users", userController.getAllUsers);
app.get("/users/:id", userController.getUserById);
app.post("/create-user", userController.createUser);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
