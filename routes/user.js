import express from "express";
import {
  validateLogin,
  validateSignup,
  validateUserUpdate,
} from "../validators/user.js";
import {
  getUser,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from "../controllers/user.js";
import { authUser } from "../middleware/authUser.js";
const user = express.Router();

user.post("/signup", validateSignup, signupUser);
user.post("/login", validateLogin, loginUser);
user.post("/logout", logoutUser);
user.get("/user", authUser, getUser);
user.post("/user", authUser, validateUserUpdate, updateUser);

export default user;
