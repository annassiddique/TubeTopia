const authService = require("../services/userService");

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



module.exports = { registerUser, loginUser, getUser};
