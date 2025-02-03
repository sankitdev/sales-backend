import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const authUser = (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: "Please Login" });
    }
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).json({ message: "Unauthorized Access" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
