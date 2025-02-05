import { body, validationResult } from "express-validator";

export const validateSale = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name should only contain alphabets and spaces")
    .trim(),
  body("image")
    .optional()
    .isString()
    .withMessage("The URL must point to an image (jpeg, jpg, png, gif, svg)."),
  body("email").isEmail().withMessage("Invalid email"),
  body("phone")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Phone is required"),
  body("selectedProducts")
    .isArray({ min: 1 })
    .withMessage("At least one product is required")
    .custom((value) => {
      return value.every(
        (product) =>
          product.productId &&
          product.quantity &&
          Number.isInteger(product.quantity) &&
          product.quantity > 0
      );
    })
    .withMessage(
      "Each product must have a valid productId and quantity greater than 0"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUpdateSale = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name should only contain alphabets and spaces")
    .trim(),
  body("phone")
    .optional()
    .isString()
    .isLength({ min: 10 })
    .withMessage("Phone is required"),
  body("selectedProducts")
    .optional()
    .isArray({ min: 1 })
    .withMessage("At least one product is required")
    .custom((value) => {
      return value.every(
        (product) =>
          product.productId &&
          product.quantity &&
          Number.isInteger(product.quantity) &&
          product.quantity > 0
      );
    })
    .withMessage(
      "Each product must have a valid productId and quantity greater than 0"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
