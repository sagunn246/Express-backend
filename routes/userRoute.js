const express = require("express");
const route = express.Router();
const User = require("../model/userModel");
const { jwtAuthMiddleware, generateJWTToken } = require("../jwt");

route.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const user = new User(data);

    const payloads = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = generateJWTToken(payloads);

    user.token = token;

    const response = await user.save();

    return res.status(200).json({
      message: "Signup successful",
      token: token,
      user: {
        id: response._id,
        username: response.username,
        email: response.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        message:
          "Signup failed: A user with this username or email already exists.",
        error: error.message,
      });
    }
    return res.status(500).json({
      message: "Server Error during signup",
      error: error.message,
    });
  }
});

route.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const payloads = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = generateJWTToken(payloads);
    return res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Server Error during login",
      error: error.message,
    });
  }
});

route.delete("/delete", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID not found in token" });
    }
    const userId = req.user.id;
    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({
      message: "Server Error during deletion",
      error: error.message,
    });
  }
});

route.patch("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const { prevpassword, currentpassword } = req.body;
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID not found in token" });
    }
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!(await user.comparePassword(prevpassword))) {
      return res.status(401).json({ message: "Invalid previous password" });
    }

    user.password = currentpassword;
    await user.save();
    return res.status(200).json({ message: "Password Changed Successfully" });
  } catch (error) {
    console.error("Password change error:", error);
    return res.status(500).json({
      message: "Server Error during password change",
      error: error.message,
    });
  }
});

module.exports = route;
