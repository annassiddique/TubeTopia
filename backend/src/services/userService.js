const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateEmailFormat } = require("../utils/validator");

// Function to register a new user
const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Validate the email format
  if (!validateEmailFormat(email)) {
    throw new Error("Invalid email format");
  }

  try {
    // Check if the user already exists in the database
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User already exists");
    }

    // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object and save it to the database
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    return newUser; // Return the new user object
  } catch (error) {
    // Handle specific MongoDB error code for duplicate emails
    if (error.code === 11000) {
      throw new Error("Email already in use");
    }
    // Handle other database-related errors
    throw new Error("Database error: " + error.message);
  }
};

// Function to log in an existing user
const loginUser = async ({ email, password }) => {
  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // Generate a JWT token with the user's ID as the payload, valid for 7 hours
  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7h",
  });

  return { accessToken }; // Return the access token
};

// Function to retrieve a user's profile, including their associated videos
const getUserProfile = async (userId) => {
  // Find the user by ID and populate the 'videos' field with the user's videos
  const user = await User.findById(userId).populate("videos");

  if (!user) {
    throw new Error("User not found");
  }

  return user; 
};

module.exports = { registerUser, loginUser, getUserProfile };
