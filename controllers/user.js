import { JWT_SECRET } from "../config/config.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { hash } from "bcrypt";
export const signupUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashPass = await hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashPass,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 3600000,
      secure: true,
      SameSite: "None",
    });
    res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isUser = await User.findById(id);
    if (!isUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const { fullName, email, image } = req.body;
    const updatedData = await User.findByIdAndUpdate(
      id,
      { fullName, image, email },
      { new: true }
    );
    res.status(201).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const logoutUser = (req, res) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: "Please Login" });
    }
    res.clearCookie("authToken", {
      httpOnly: true,
      maxAge: 0,
      sameSite: "None",
      secure: true,
      path: "/",
      domain: "localhost",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
