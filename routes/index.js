import express from "express";
import user from "./user.js";
import product from "./product.js";
import sales from "./sales.js";

const router = express.Router();

router.use("/", user);
router.use("/", product);
router.use("/", sales);

export default router;
