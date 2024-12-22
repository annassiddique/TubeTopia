const authService = require("../services/userService");
const {
  sendReminderEmail,
  sendEmailsToAllUsers,
} = require("../services/emailService");

// Controller function to handle user registration
const registerUser = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body); // Calls the service to register a new user
    res.status(201).json({ user }); 
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
};

// Controller function to handle user login
const loginUser = async (req, res) => {
  try {
    const token = await authService.loginUser(req.body); // Calls the service to authenticate the user and generate a token
    res.status(200).json({ token }); 
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
};

// Controller function to fetch the current user's profile
const getUser = async (req, res) => {
  try {
    const user = await authService.getUserProfile(req.user.userId); // Fetches user data based on the authenticated user's ID
    res.status(200).json(user); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

// Controller function to send voting reminder emails to all users
const sendVotingReminder = async (req, res) => {
  try {
    const response = await sendEmailsToAllUsers(); // Calls the service to send reminder emails
    res.status(200).json({ message: "Reminder emails sent successfully!" }); 
  } catch (error) {
    console.error("Error in sendVotingReminder:", error); 
    res.status(500).json({ message: "Internal server error." }); 
  }
};

module.exports = { registerUser, loginUser, getUser, sendVotingReminder };
