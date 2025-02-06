import express from "express";
import connectDb from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT } from "./config/config.js";
import { logger } from "./logger.js";
import router from "./routes/index.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});
app.use("/", router);
const startServer = async () => {
  await connectDb();
  app.listen(PORT, () => {
    logger.info(`http://localhost:${PORT}`);
  });
};
startServer();
