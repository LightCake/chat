const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const db = require("../db");
const keys = require("../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const router = express.Router();

// Register
router.post("/register", (request, response) => {
  // Check whether the register input is valid
  const { errors, isValid } = validateRegisterInput(request.body);
  // If the input is invalid
  if (!isValid) {
    // Return an error response
    return response.status(400).json(errors);
  }
  // Destructure form input values form the request body
  const { name, password } = request.body;
  //Check to make sure nobody has already registered with the same name
  db.query(
    "SELECT EXISTS (SELECT 1 FROM users WHERE name = $1)",
    [name],
    (err, res) => {
      // If any error occured during the query throw it
      if (err) throw err;
      // If an user with the same name already exists
      if (res.exists) {
        // Send an error response
        errors.name = "An user has already registered with this name";
        return response.status(400).json(errors);
      } else {
        // Otherwise, create a new user
        // Hash the password
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;

          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;

            // Insert user into the database
            db.query(
              "INSERT INTO users (name, password) VALUES ($1, $2)",
              [name, hash],
              (err, res) => {
                if (err) throw err;

                if (res) {
                  response.json({ msg: "success" });
                }
              }
            );
          });
        });
      }
    }
  );
});

// Login
router.post("/login", (request, response) => {
  // Check to make sure login input is valid
  const { errors, isValid } = validateLoginInput(request.body);
  // If the login input is invalid
  if (!isValid) {
    // Return an error response
    return response.status(400).json(errors);
  }

  // Destructure request.body to get the input values
  const { name, password } = request.body;

  // Check to make sure user has already registered
  db.query("SELECT * FROM users WHERE name = $1", [name], (err, res) => {
    if (err) throw err;
    // Found an user with the given name
    if (res.rows.length > 0) {
      const user = res.rows[0];
      // Compare both passwords
      bcrypt.compare(password, user.password).then(isMatch => {
        // If both passwords match
        if (isMatch) {
          // Return the response with a JWT
          const { id, name } = user;
          const payload = {
            id,
            name
          };
          jwt.sign(
            payload,
            keys.secretOrKey,
            // Make the key to expire in one hour (in seconds)
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;

              response.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          );
        } else {
          // If the passwords are not matching, return an error response
          return response.status(400).json({ password: "Incorrect password" });
        }
      });
    } else {
      // If the user with the given name does not exist, return an error response
      return response
        .status(400)
        .json({ name: "User with given name does not exist" });
    }
  });
});

module.exports = router;
