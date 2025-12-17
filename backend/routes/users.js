import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import User from "../models/User.js";
const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

// Route to handle user login
router.post("/login", async (req, res) => {
  res.send("Get all users");
});

// Route to handle user registration
router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userExists = false;
    // const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: "User already exists!" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, username });
    const token = jwt.sign({ id: newUser._id }, "secret", { expiresIn: "1h" });
    res.status(201).json({ message: "User registered successfully!", user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Error during registration. Please try again.", error: error.message });
  }
});

// Route to get user details
router.get("/user", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details. Please try again.", error: error.message });
  }
});

export default router;