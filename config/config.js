import { configDotenv } from "dotenv";
configDotenv();

export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
