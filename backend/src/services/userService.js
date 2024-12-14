const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateEmailFormat } = require("../utils/validator");

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  if (!validateEmailFormat(email)) {
    throw new Error("Invalid email format");
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    return newUser;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Email already in use");
    }
    throw new Error("Database error: " + error.message);
  }
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7h",
  });

  return { accessToken };
};

const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports = { registerUser, loginUser, getUserProfile };
