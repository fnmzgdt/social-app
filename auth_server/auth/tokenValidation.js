const { verify } = require("jsonwebtoken");

module.exports = {
  validateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (token) {
      verify(token, "papajohny7", (err, results) => {
        if (err) {
          res.json({ success: 0, message: "Invalid token" });
        } else {         
          req.userDetails = results;
          next();
        }
      });
    } else {
      res.status(401).json({ success: 0, message: "Unauthorized user" });
    }
  },
};
