const jwt = require("jsonwebtoken");

// Middleware to authenticate user based on JWT token
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Get token from Authorization header

  // If no token is provided, return an error response
  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    // Verify the token using the secret key and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; // Attach decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateUser;
