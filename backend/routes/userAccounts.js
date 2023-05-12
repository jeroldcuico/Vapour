const express = require("express");
let router = express.Router();

//Initialize Data without DB
let users = [
  {
    id: 0,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  },
  {
    id: 1,
    firstName: "",
    lastName: "",
    username: "test",
    email: "test@mail.com",
    password: "none",
  },
];

router.get("/all", (req, res) => {
  res.send(users);
});

let loggedInUsers = [];

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // validation logic if login is correct
  const findUser = users.find((user) => user.username === username && user.password === password);
  if (findUser) {
    const token = Math.random().toString(36).substring(7);
    loggedInUsers.push({ username, token });
    res.json({ success: true, token , findUser , message : "Login Successfully" });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  // Check if the user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    res.send({ message: "Email already exist", status: false });
  } else {
    // Save the user data in memory
    const user = { id: users.length + 1, username, email, password };
    users.push(user);
    res.send({ message: "User registered successfully", status: true});
  }
});

//Logout using Random Token
router.post('/logout', (req, res) => {
  const { token } = req.body;
  loggedInUsers = loggedInUsers.filter((user) => user.token !== token);
  res.json({ success: true });
});


module.exports = router;
