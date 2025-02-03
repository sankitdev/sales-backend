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
    .isString()
    .withMessage("The URL must point to an image (jpeg, jpg, png, gif,svg)."),
  body("email").isEmail().withMessage("Invalid email"),
  body("phone")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Phone is required"),
  body("productName")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Product is required"),
  body("quantity")
    .isInt()
    .isLength({ min: 1, max: 10 })
    .withMessage("Enter valid quantity"),
  body("price").isInt().withMessage("Price is required"),
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

  body("product")
    .isString()
    .optional()
    .withMessage("The URL must point to an image (jpeg, jpg, png, gif,svg)."),

  body("description")
    .isString()
    .optional()
    .isLength({ min: 5 })
    .withMessage("Description is required"),
  body("price").isInt().withMessage("Price is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
