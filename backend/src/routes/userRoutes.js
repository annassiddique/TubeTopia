const express = require("express");
const router = express.Router();
const authController = require("../controllers/userController");
const authenticateUser = require("../middleware/authUserMiddleware");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/profile", authenticateUser, authController.getUser);



module.exports = router;
