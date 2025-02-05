import express from "express";
import {
  addSale,
  deleteSale,
  getSaleById,
  getSales,
  updateSale,
} from "../controllers/sale.js";
import { validateSale, validateUpdateSale } from "../validators/sale.js";

const sales = express.Router();
sales.get("/sales", getSales);
sales.get("/sale/:id", getSaleById);
sales.post("/sale", validateSale, addSale);
sales.patch("/sale/:id", validateUpdateSale, updateSale);
sales.delete("/sale/:id", deleteSale);
export default sales;
