const express = require("express");
const { signup, login } = require("../controller/userController");

const router = express.Router();

// Route: Signup
router.post("/signup", signup);

// Login route
router.post("/login", login);

module.exports = router;
