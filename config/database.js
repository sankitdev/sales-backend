import mongoose from "mongoose";
import { DB_URL } from "./config.js";
import { logger } from "../logger.js";

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URL);
    logger.info("Connect to Database successfully!");
  } catch (error) {
    logger.error("Error: ", error);
    process.exit(1);
  }
};

export default connectDb;
