const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// User model
const User = require("../models/User.js");
// Login page
router.get("/login", (req, res) => res.render("login"));

// Register page
router.get("/register", (req, res) => res.render("register"));

// Register handle
router.post("/register", (req, res) => {
  const { fullname, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!fullname || !email || !password || !password2)
    errors.push({ msg: "Please fill in all fields" });
  // Check passwords match
  if (password !== password2) errors.push({ msg: "Password do not match" });
  // Check password length
  if (password.length < 6)
    errors.push({ msg: "Password should be at least 6 characters" });

  if (errors.length > 0) {
    res.render("register", {
      errors,
      fullname,
      email,
      password,
      password2,
    });
  } else {
    // Validation passed
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          // User exist
          errors.push({ msg: "Email is already registered" });
          res.render("register", {
            errors,
            fullname,
            email,
            password,
            password2,
          });
        } else {
          const newUser = new User({
            fullname,
            email,
            password,
          });

          // Hash Password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              // Set password to hashed
              newUser.password = hash;
              // Save user
              newUser
                .save()
                .then((user) => {
                  req.flash("success_msg", "You are now registered");
                  res.redirect("/users/login");
                })
                .catch((err) => console.log(err));
            })
          );
        }
      })
      .catch();
  }
});

// Login handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout handle
router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
