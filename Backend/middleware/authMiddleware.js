const jwt = require("jsonwebtoken");
const User = require("../model/User");

const authenticate = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Unauthorized, no token" });
  }
};

module.exports = authenticate;
