const express = require("express");
const { body } = require("express-validator");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Invalid email format."),
    body("username").isLength({ min: 4, max: 12 }).withMessage("Username must be 4-12 characters long."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long.")
      .matches(/\d/).withMessage("Password must contain at least one number."),
    body("country").notEmpty().withMessage("Country is required."),
  ],
  signup
);

router.post(
  "/login",
  [
    body("usernameOrEmail").notEmpty().withMessage("Username or email is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  login
);

module.exports = router;
