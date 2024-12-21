const authService = require("../services/userService");
const {
  sendReminderEmail,
  sendEmailsToAllUsers,
} = require("../services/emailService");

const registerUser = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const token = await authService.loginUser(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await authService.getUserProfile(req.user.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendVotingReminder = async (req, res) => {
  try {
    const response = await sendEmailsToAllUsers();
    res.status(200).json({ message: "Reminder emails sent successfully!" });
  } catch (error) {
    console.error("Error in sendVotingReminder:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { registerUser, loginUser, getUser, sendVotingReminder };
