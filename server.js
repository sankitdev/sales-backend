import express from "express";
import connectDb from "./config/database.js";
import user from "./routes/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT } from "./config/config.js";
import { logger } from "./logger.js";
import product from "./routes/product.js";
import sales from "./routes/sales.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", user);
app.use("/", product);
app.use("/", sales);
// app.use("/", authUser, product);
const startServer = async () => {
  await connectDb();
  app.listen(PORT, () => {
    logger.info(`http://localhost:${PORT}`);
  });
};
startServer();
