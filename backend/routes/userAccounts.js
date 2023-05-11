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

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const checkifSame = users.find(
    (user) => user.username === username && user.password === password
  );
  res.send(
    checkifSame
      ? { user: checkifSame, message: "Logged in Successfully" }
      : { message: "User dont exist like your mom" }
  );
});

router.post("/logout", (req, res) => {
  // Clear the user information from the session
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.json({ message: "Logout successful" });
});

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  // Check if the user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    res.send({ message: "Email already exist", status: "failed" });
  } else {
    // Save the user data in memory
    const user = { id: users.length + 1, username, email, password };
    users.push(user);
    res.send({ message: "User registered successfully", status: "success" });
  }
});

module.exports = router;
