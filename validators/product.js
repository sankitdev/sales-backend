import { body, validationResult } from "express-validator";

export const validateProduct = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name should only contain alphabets and spaces")
    .trim(),
  body("image")
    .isString()
    .withMessage("The URL must point to an image (jpeg, jpg, png, gif,svg)."),
  body("description")
    .isString()
    .isLength({ min: 5 })
    .withMessage("Description is required"),
  body("quantity")
    .isInt()
    .isLength({ min: 1 })
    .withMessage("Quantity is required"),
  body("price").isInt().withMessage("Price is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUpdateProduct = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name should only contain alphabets and spaces")
    .trim(),

  body("image")
    .isString()
    .optional()
    .withMessage("The URL must point to an image (jpeg, jpg, png, gif,svg)."),

  body("description")
    .isString()
    .optional()
    .isLength({ min: 5 })
    .withMessage("Description is required"),
  body("price").isInt().optional().withMessage("Price is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
