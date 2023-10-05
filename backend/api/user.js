const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require('uuid');
const User = require("../models/user");
const ApiResponse = require("../utils/ApiResponse");  // Import ApiResponse module

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(ApiResponse.validationError(errors));
      }

      const { email, password } = req.body;

      // Check if the user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json(ApiResponse.error("Invalid credentials"));
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json(ApiResponse.error("Invalid credentials"));
      }

      // Create and return a JSON Web Token
      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        "your-secret-token", // Replace with your own secret token for JWT signing
        { expiresIn: "1d" }, // Set the expiration time as per your requirements
        (err, token) => {
          if (err) throw err;
          res.json(ApiResponse.success({ token }, "Login successful"));
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json(ApiResponse.error("Server Error"));
    }
  }
);

router.post(
  "/signup",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 8 or more characters").isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(ApiResponse.validationError(errors));
      }

      const { name, email, password } = req.body;

      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json(ApiResponse.error("User already exists"));
      }

      const id = uuidv4();
      user = new User({
        id,
        name,
        email,
        password,
      });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the user to the database
      await user.save();

      // Create and return a JSON Web Token
      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        "your-secret-token", // Replace with your own secret token for JWT signing
        { expiresIn: "1h" }, // Set the expiration time as per your requirements
        (err, token) => {
          if (err) throw err;
          res.json(ApiResponse.success({ token }, "Signup successful"));
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json(ApiResponse.error("Server Error"));
    }
  }
);

module.exports = router;
