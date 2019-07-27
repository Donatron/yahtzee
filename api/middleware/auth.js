const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = function(req, res, next) {
  // Get token from header
  let token = req.header("Authorization");
  token = token.split(" ")[1];

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No authorization token found" });
  }

  // Verify token
  try {
    const { secretOrKey } = keys;

    const decoded = jwt.verify(token, secretOrKey);

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
