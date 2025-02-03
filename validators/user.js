import { body, validationResult } from "express-validator";

export const validateSignup = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character"),
  body("fullName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Full name is too short"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUserUpdate = [
  body("email").isEmail().withMessage("Invalid email"),
  body("fullName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Full name is too short"),
  body("image")
    .optional()
    .isURL()
    .withMessage("The URL is invalid.")
    .matches(/\.(jpeg|jpg|png|gif|svg)$/i)
    .withMessage("The URL must point to an image (jpeg, jpg, png, gif,svg)."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
