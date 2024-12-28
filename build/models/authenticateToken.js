const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided or invalid format." });
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired." });
    }
    if (error.name === "JsonWebTokenError") { 
      return res.status(400).json({ error: "Invalid token." });
    }
    res.status(500).json({ error: "An internal error occurred." });
  }
};

module.exports = authenticateToken;
