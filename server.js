import express from "express";
import connectDb from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT } from "./config/config.js";
import { logger } from "./logger.js";
import router from "./routes/index.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", router);
// app.use("/", authUser, product);
const startServer = async () => {
  await connectDb();
  app.listen(PORT, () => {
    logger.info(`http://localhost:${PORT}`);
  });
};
startServer();
