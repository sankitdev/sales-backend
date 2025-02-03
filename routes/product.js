import express from "express";
import {
  validateProduct,
  validateUpdateProduct,
} from "../validators/product.js";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateProduct,
} from "../controllers/product.js";

const product = express.Router();

product.get("/products", getProduct);
product.get("/product/:id", getProductById);
product.post("/products", validateProduct, addProduct);
product.patch("/products/:id", validateUpdateProduct, updateProduct);
product.delete("/products/:id", deleteProduct);
export default product;
